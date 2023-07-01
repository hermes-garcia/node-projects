const {
    select,
    input,
    confirm,
    checkbox
} = require('@inquirer/prompts');
require('colors');

const menuOpts = {
    message: 'What you wanna do?',
    choices: [
        {
            name: `${'1.'.blue} Search place`,
            value: 1,
        }, {
            name: `${'2.'.blue} History`,
            value: 2,
        }, {
            name: `${'0.'.blue} Exit`,
            value: 0,
        },
    ]
};

const inquirerMenu = async () => {
    console.clear();
    console.log('===================='.green)
    console.log(' Select an option '.white)
    console.log('====================\n'.green)
    return select(menuOpts);
}


const pause = async() => {
    console.log('\n');
    await input({message: `Press ${'ENTER'.blue} to continue`});
}


const readInput = async(message) => {
    return input({
        message,
        validate(value) {
            if (value.length === 0 ) {
                return 'Please input a value'
            }
            return true;
        }
    });
}


const listOptions = async (opts = [], message = '') => {
    const choices = opts.map( (opt, i) => {
        const idx = `${(i+1) + '.'}`.blue;
        return {
            name: `${idx} ${opt.name}`,
            value: opt.id
        }
    });
    const selectOpts = {
        message,
        choices
    }

    choices.unshift({
        value: 0,
        name: '0.'.blue + ' Cancel'
    })

    return select(selectOpts);
}


const confirmAction = async (message = '') => {
    return confirm({message});
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listOptions,
    confirmAction,
}