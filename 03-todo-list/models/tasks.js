require('colors');

const Task = require('./task');

/**
 * _list:
 *      { 'uid-1234-1234': { uid: 123, desc: 'asd', completed: 123},
 */

class Tasks {
    _list = {};

    get listArray () {
        const list = [];
        Object.keys(this._list).forEach( key => {
            list.push(this._list[key])
        });
        return list;
    }
    constructor() {
        this._list = {};
    }

    deleteTask( id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach( ({desc, id, completed}) => {
           this.createTask(desc,id,completed);
        });
    }

    createTask(desc = '', id = null, completed = null) {
        const task = new Task(desc, id, completed);
        this._list[task.id] = task;
    }

    listAll() {
        console.log();
        this.listArray.forEach( (task, i) => {
            const completed = task.completed ? 'Completed'.green : 'Pending'.red;
            const idx = `${(i+1) + '.'}`.blue;
            console.log(`${idx} ${task.desc} :: ${completed}`)
        });
    }

    listCompleted( completed ) {
        console.log();
        let i = 1;
        if (completed) {
            this.listArray.forEach( task => {
                if (task.completed) {
                    console.log(`${`${i+'.'}`.blue} ${task.desc} :: ${'Completed'.green}`)
                    i++;
                }
            });
        } else {
            this.listArray.forEach( task => {
                if (!task.completed) {
                    console.log(`${`${i+'.'}`.blue} ${task.desc} :: ${'Pending'.red}`)
                    i++;
                }
            });
        }
    }

    toggleCompletedTasks( ids = []) {
        ids.forEach( id => {
            this._list[id].completed = new Date().getTime();
        });

        const rest = this.listArray.filter( task => !ids.includes(task.id) );
        rest.forEach( task => {
            this._list[task.id].completed = null;
        });
    }
}

module.exports = Tasks;