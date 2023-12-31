const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            users:      '/api/users',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

}


module.exports = Server;