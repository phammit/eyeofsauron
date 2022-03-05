"use strict";
//import { graphqlHTTP } from 'express-graphql';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const http_1 = require("http");
const MONGODB_USER = 'root';
const MONGODB_PASSWORD = 'root_password';
const url = 'mongodb://localhost:27017';
const dbName = 'poc-mongodb';
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const { app } = yield (0, app_1.bootstrap)();
    dotenv_1.default.config();
    const PORT = process.env.PORT || 3001;
    app.set("port", PORT);
    //@TODO add auth middleware
    //@TODO add registration page
    const server = (0, http_1.createServer)(app);
    server.listen(PORT, () => {
        console.log(`Eye of Sauron is watching on port: ${PORT}`);
    });
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
        if (error.syscall !== "listen") {
            throw error;
        }
        const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
        // handle specific listen errors with friendly messages
        switch (error.code) {
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
});
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
