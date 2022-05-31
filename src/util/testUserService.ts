// class responsible for configuring the connection to mongodb
//following guide https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
//need to connect to mongodb w/ TypeScript

//External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import { injectable } from 'inversify';
//import * as mongoose from 'mongoose';
import mongoose, { Schema , model, Model, Document } from 'mongoose';
import UserModel, { User, testSchema } from '../models/testUser';
//import { TestUserService } from "../interfaces";

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

//interfaces
export interface TestUserServiceTYPE{
    connect(): Promise<any>;
    disconnect(): Promise<any>;
}

const MONGODB_USER = 'root';
const MONGODB_PASSWORD = 'root_password';
const url = 'mongodb://localhost:27017';
const dbName = 'test-mongodb';
//code from https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
let database: mongoose.Connection;
export async function connect() {
    if (database) {
        return;
    }
    await mongoose.connect(`${url}/${dbName}`)
    database = mongoose.connection;
    database.once('open', async () => {
        console.log("Connected to mongodb database running in docker");
    });
    database.on("error", () => {
        console.log("Oops, there is some error connected to mongodb in docker");
    });

    const query = await UserModel.find();
    console.log(query);

};
export async function disconnect (){
    if (!database) {
        return;
    }
    mongoose.disconnect();
};



@injectable()
export class TestUserService {
    public async connect(): Promise<any>{
        console.log("welcome to Testuserservice");
        if (database) {
            console.log("already connected to mongodb")
        } else {
            await mongoose.connect(`${url}/${dbName}`)
            database = mongoose.connection;
            database.once('open', async () => {
                console.log("Connected to mongodb database running in docker");
            });
            database.on("error", () => {
                console.log("Oops, there is some error connected to mongodb in docker");
            });
        }
    
        const query = await UserModel.find({ name: "John"});
        console.log(query);
        return query;
    
    };

    public async addUser(user: User): Promise<any>{
        console.log("Welcome to TestUserService: now attempting to add a user");
        if (database) {
            console.log("already connected to mongodb")
        } else {
            await mongoose.connect(`${url}/${dbName}`)
            database = mongoose.connection;
            database.once('open', async () => {
                console.log("Connected to mongodb database running in docker");
            });
            database.on("error", () => {
                console.log("Oops, there is some error connected to mongodb in docker");
            });
        }
        //create a document instance using the model
        var newUser = new UserModel({ id: user.id, address: user.address, name: user.name});
        const mutation = await newUser.save(function (err, user) {
            if (err) return console.log(err);
            console.log(user.name + " has been save to mongodb database");
        })
        


    }
    
    public async disconnect(): Promise<any>{
        if (!database) {
            return;
        }
        mongoose.disconnect();
    };
};


