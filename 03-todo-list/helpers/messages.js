require('colors');


const showMenu = () => {

    return new Promise( (resolve) => {
        console.clear();
        console.log('===================='.green)
        console.log(' Select an option '.green)
        console.log('====================\n'.green)

        console.log(`${'1.'.blue} Create task`);
        console.log(`${'2.'.blue} List task`);
        console.log(`${'3.'.blue} List completed task`);
        console.log(`${'4.'.blue} List pending task`);
        console.log(`${'5.'.blue} Complete task(s)`);
        console.log(`${'6.'.blue} Delete task`);
        console.log(`${'0.'.blue} Exit\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Select an option: ', opt => {
            readline.close();
            resolve(opt);
        })
    });
}

const pause = () => {

    return new Promise( (resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPress ${'ENTER'.blue} to continue\n`, () => {
            readline.close();
            resolve();
        })
    });
}


module.exports = {
    showMenu,
    pause
}