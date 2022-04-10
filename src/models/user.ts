//models for mongodb
//using https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial as a guide

//external dependencies
import { ObjectId } from "mongodb";  //used for the _id field


//class implementations
export default class User {
    constructor(public email: string, public phone?: number, public LNChannel?: string, public password?: string, public id?: ObjectId) {}
}