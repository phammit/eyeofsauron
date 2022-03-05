//import { graphqlHTTP } from 'express-graphql';

import dotenv from 'dotenv';
import { bootstrap } from './app';
import { createServer } from "http";
import mongo from "mongodb";
//import { assert } from 'console';
import assert from 'assert';

const MONGODB_USER = 'root';
const MONGODB_PASSWORD = 'root_password';
const url = 'mongodb://localhost:27017';
const dbName = 'poc-mongodb';


const start = async () => {
    const { app } = await bootstrap();

    dotenv.config();

    const PORT = process.env.PORT || 3001;
    app.set("port", PORT);

    //@TODO add auth middleware
    //@TODO add registration page

    const server = createServer(app);

    server.listen(PORT, () =>{
        console.log(`Eye of Sauron is watching on port: ${PORT}`)
    })
    //server.listen(PORT);
    /** 
    server = app.listen(PORT, function () {
        console.log(`Eye of Sauron is watching on port: ${PORT}`);
    });
    */

    /** 
    const client = new mongo.MongoClient(url);

    client.connect( (err) => {
        assert.equal(err, null);
        console.log("Connected Successfully to mongodb server");

        //get the database named 'poc-mongodb'
        const db = client.db(dbName);

        //create collection.  Will auto-create the listing collection if not found
        const collection = db.collection('user', function(err, res) {
            if (err) throw err;
            console.log('Collection created - user');
        })

    });
    */

    /**
     * Event listener for HTTP server "error" event.
     */
    server.on("error", error => {
        // tslint:disable-next-line:
        if ((error as any).syscall !== "listen") {
        throw error;
        }

        const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

        // handle specific listen errors with friendly messages
        switch ((error as any).code) {
        case "EACCES":
            // tslint:disable-next-line: no-console
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            // tslint:disable-next-line: no-console
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
        }
    });
}

start();
/** 
function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

const reportError = ({message}: {message: string}) => {
    console.log(message)
}

try {
    main()
} catch (error) {
    reportError({message: getErrorMessage(error)})
}
*/
