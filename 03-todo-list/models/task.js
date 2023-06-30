const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completed = null;
    constructor(desc, id = null, completed = null) {
        this.desc = desc;
        this.id = id ?? uuidv4();
        this.completed = completed ?? null;
    }
}

module.exports = Task;