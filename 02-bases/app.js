const { createMultiplierFile } = require('./helpers/multiply');

const argv = require('./config/yargs');

console.clear();
createMultiplierFile(argv.b, argv.l, argv.h) //l
    .then(r => console.log(`File ${r} created`))
    .catch(e => console.log(e));