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
            name: `${'1.'.blue} Create task`,
            value: 1,
        }, {
            name: `${'2.'.blue} List task`,
            value: 2,
        }, {
            name: `${'3.'.blue} List completed task`,
            value: 3,
        }, {
            name: `${'4.'.blue} List pending task`,
            value: 4,
        }, {
            name: `${'5.'.blue} Complete task(s)`,
            value: 5,
        }, {
            name: `${'6.'.blue} Delete task`,
            value: 6,
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


const listTasksToDelete = async (tasks = []) => {
    const choices = tasks.map( (task, i) => {
        const idx = `${(i+1) + '.'}`.blue;
        return {
            name: `${idx} ${task.desc}`,
            value: task.id
        }
    });
    const taskOpts = {
        message: 'Select a task to delete',
        choices
    }

    choices.unshift({
        value: 0,
        name: '0.'.blue + ' Cancel'
    })

    return select(taskOpts);
}


const listTasksToCheck = async (tasks = []) => {
    const choices = tasks.map( (task, i) => {
        const idx = `${(i+1) + '.'}`.blue;
        return {
            name: `${idx} ${task.desc}`,
            value: task.id,
            checked: !!task.completed
        }
    });
    const taskOpts = {
        message: 'Check tasks to complete them',
        choices
    }

    return checkbox(taskOpts);
}

const confirmAction = async (message = '') => {
    return confirm({message});
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirmAction,
    listTasksToCheck
}