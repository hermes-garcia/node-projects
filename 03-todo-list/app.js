require('colors');

const Tasks = require('./models/tasks');
const { saveDatabase, readDatabase } = require('./helpers/save-file');

const {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirmAction,
    listTasksToCheck
} = require('./helpers/inquirer');

const main = async() => {
    let opt = null;
    const tasks = new Tasks();
    const dbTasks = readDatabase();
    if ( dbTasks.length !== 0) {
        tasks.loadTasksFromArray(dbTasks);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                tasks.createTask(await readInput('Task definition: '));
                break;
            case 2:
                tasks.listAll();
                break;
            case 3:
                tasks.listCompleted(true);
                break;
            case 4:
                tasks.listCompleted(false);
                break;
            case 5:
                const ids = await listTasksToCheck(tasks.listArray);
                tasks.toggleCompletedTasks(ids);
                break;
            case 6:
                const id = await listTasksToDelete(tasks.listArray);
                if (id !== 0 && await confirmAction('Are you sure you wanna delete this task?')) {
                    tasks.deleteTask(id);
                    console.log('Task deleted');
                }
                break;
        }

        saveDatabase(tasks.listArray);

        await pause();
    } while (opt !== 0);
}


main();