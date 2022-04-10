// class responsible for configuring the connection to mongodb
//following guide https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
//need to connect to mongodb w/ TypeScript

//External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import * as Mongoose from 'mongoose';
import UserModel  from '../models/testUser';

//Global Variables
export const collections: { users?: mongoDB.Collection } = {}

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
let database: Mongoose.Connection;
export const connect = () => {
    if (database) {
        return;
    }
    Mongoose.connect(`${url}/${dbName}`)
    database = Mongoose.connection;
    database.once('open', async () => {
        console.log("Connected to mongodb database running in docker");
    });
    database.on("error", () => {
        console.log("Oops, there is some error connected to mongodb in docker");
    });

};
export const disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};

