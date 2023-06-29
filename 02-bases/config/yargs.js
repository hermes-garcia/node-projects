const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'Multiplier base'
        },
        'l': {
            alias: 'list',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Show table on console'
        },
        'h': {
            alias: 'limit',
            type: 'number',
            demandOption: false,
            default: 10,
            describe: 'Multiplier limit'
        },
    })
    .check((argv, options) => {
        if ( isNaN(argv.b) ) throw new Error('Base must be a number');
        return true;
    })
    .argv;

module.exports = argv;