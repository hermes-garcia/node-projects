const fs  = require('fs');
const file = './db/data.json'
const saveDatabase = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDatabase = () => {
    if ( !fs.existsSync(file) ) {
        return null;
    }
    return JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}));
}

module.exports = {
    saveDatabase,
    readDatabase
}