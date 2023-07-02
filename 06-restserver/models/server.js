const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersApiPath = '/api/users';

        this.connectDb();

        this.middlewares();

        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() )
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usersApiPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

}


module.exports = Server;