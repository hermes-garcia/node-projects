import express, { Application } from 'express';
import cors from 'cors';
import userRouter from '../routes/user';
import db from "../db/conection";

class Server {
    private app: Application;
    private apiPaths = {
        users: '/api/users',
    }
    private readonly port: string;
    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8080';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('db online');
        } catch (error) {
            console.log(error);
            throw new Error(error as string);
        }
    }
    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }
    listen() {
        this.app.listen(this.port, () =>{
            console.log(`Server running on port: ${this.port}`);
        });
    }
    routes() {
        this.app.use( this.apiPaths.users, userRouter );
    }
}

export default Server;