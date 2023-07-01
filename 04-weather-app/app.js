require('dotenv').config();
require('colors');
const { readInput, inquirerMenu, pause, listOptions} = require('./helpers/inquirer');
const Searches = require('./models/Searches');

const main = async() => {
    let opt = null;

    const searches = new Searches();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const place = await readInput('Enter a place to search');
                const places = await searches.searchPlaces(place);

                const selectedPlaceId = await listOptions(places, 'Select a place to view more info');
                const selectedPlace = places.find( place => place.id === selectedPlaceId  );

                if (!selectedPlace) continue;

                const currentWeather = await searches.getWeatherByCoords(selectedPlace.lat, selectedPlace.lng);

                if (!currentWeather) continue;

                searches.addHistory(selectedPlace.name);

                console.log('\nInformation:\n'.green);
                console.log('Place:'.blue, selectedPlace.name);
                console.log('Lat:'.blue, selectedPlace.lat);
                console.log('Lng:'.blue, selectedPlace.lng);
                console.log('Temp:'.blue, currentWeather.tmp);
                console.log('Min temp:'.blue, currentWeather.min);
                console.log('Max temp:'.blue, currentWeather.max);
                console.log('Description:'.blue, currentWeather.desc);
                break;
            case 2:
                searches.history.forEach( (placeName, i) => {
                    const idx = `${(i+1) + '.'}`.blue;
                    console.log(`${idx} ${placeName}`);
                })
                break;
        }

        if (opt !== 0) {
            await pause();
        }

    } while (opt !== 0);

}

main();