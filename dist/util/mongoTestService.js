"use strict";
// class responsible for configuring the connection to mongodb
//following guide https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
//need to connect to mongodb w/ TypeScript
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = exports.collections = void 0;
const Mongoose = __importStar(require("mongoose"));
//Global Variables
exports.collections = {};
//Initialize Connection
//start coding the key functions in this service
/** code from guide.. use my own code from node_mongo_w_Docker to connect
 *  export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME);

    collections.users = usersCollection;

    console.log(`Succesfully connected to database: : ${db.databaseName} and collection:  ${usersCollection.collectionName}`);
}*/
const MONGODB_USER = 'root';
const MONGODB_PASSWORD = 'root_password';
const url = 'mongodb://localhost:27017';
const dbName = 'poc-mongodb';
//code from https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
let database;
const connect = () => {
    if (database) {
        return;
    }
    Mongoose.connect(`${url}/${dbName}`);
    database = Mongoose.connection;
    database.once('open', async () => {
        console.log("Connected to mongodb database running in docker");
    });
    database.on("error", () => {
        console.log("Oops, there is some error connected to mongodb in docker");
    });
};
exports.connect = connect;
const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
exports.disconnect = disconnect;
