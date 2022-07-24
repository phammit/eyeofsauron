"use strict";
// class responsible for configuring the connection to mongodb
//following guide https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
//need to connect to mongodb w/ TypeScript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUserService = exports.collections = void 0;
const inversify_1 = require("inversify");
//import * as mongoose from 'mongoose';
const mongoose_1 = __importDefault(require("mongoose"));
//import UserModel, { User, testSchema } from '../models/testUser';
const testZoronUser_1 = __importDefault(require("../models/testZoronUser"));
//import { TestUserService } from "../interfaces";
//Global Variables
exports.collections = {};
const MONGODB_USER = 'root';
const MONGODB_PASSWORD = 'root_password';
const url = 'mongodb://localhost:27017';
const dbName = 'test-mongodb';
//code from https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
let database;
/**
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
*/
let TestUserService = class TestUserService {
    async connect() {
        console.log("welcome to Testuserservice");
        if (database) {
            console.log("already connected to mongodb");
        }
        else {
            await mongoose_1.default.connect(`${url}/${dbName}`);
            database = mongoose_1.default.connection;
            database.once('open', async () => {
                console.log("Connected to mongodb database running in docker");
            });
            database.on("error", () => {
                console.log("Oops, there is some error connected to mongodb in docker");
            });
        }
        /** need to move into seperate query function
        const query = await UserModel.find({ name: "John"});
        console.log(query);
        return query;
        */
    }
    ;
    async addUser(user) {
        console.log("Welcome to TestUserService: now attempting to add a user");
        /**
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
        */
        //call connect()
        this.connect();
        //create a document instance using the model
        var newUser = new testZoronUser_1.default({ _id: user._id, address: user.address, name: user.name });
        const mutation = await newUser.save(function (err, user) {
            if (err)
                return console.log(err);
            console.log(user.name + " has been save to mongodb database");
        });
    }
    async findUser(name) {
        this.connect();
        var newUser = new testZoronUser_1.default();
        const query = await testZoronUser_1.default.find({ name: name });
        //const query = await newUser.findOneAndDelete({name: name});
        console.log(query);
        return query;
    }
    ;
    async disconnect() {
        if (!database) {
            return;
        }
        mongoose_1.default.disconnect();
    }
    ;
};
TestUserService = __decorate([
    (0, inversify_1.injectable)()
], TestUserService);
exports.TestUserService = TestUserService;
;
