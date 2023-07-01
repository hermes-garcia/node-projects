const axios = require('axios');
const { saveDatabase, readDatabase } = require('../helpers/save-file');

class Searches {
    history = [];

    constructor() {
        this.loadPlacesFromDb();
    }

    get paramsMapbox () {
        return {
            language: 'en',
            limit: 5,
            access_token: process.env.MAPBOX_KEY
        };
    }

    async searchPlaces(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get('');
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }));
        } catch (e) {
            return [];
        }
    }

    async getWeatherByCoords(lat, lng) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    units: 'metric',
                    lat,
                    lon: lng,
                    appid: process.env.OPEN_WEATHER_KEY
                }
            });
            const { data } = await instance.get('');
            return {
                desc: data.weather[0].main,
                min: data.main.temp_min,
                max: data.main.temp_max,
                tmp: data.main.temp
            };
        } catch (e) {
            console.log(e);

            return null;
        }
    }

    addHistory(placeName = '') {
        if (this.history.includes(placeName)) return;

        this.history.unshift(placeName);

        this.history = this.history.splice(0,5);

        this.savePlacesOnDb();
    }

    savePlacesOnDb() {
        const payload = {
            history: this.history
        }
        saveDatabase(payload);
    }

    loadPlacesFromDb() {
        this.history = readDatabase()?.history ?? [];
    }

}

module.exports = Searches;