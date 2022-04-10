//import { graphqlHTTP } from 'express-graphql';

import dotenv from 'dotenv';
import { bootstrap } from './app';
import { createServer } from "http";
import mongo from "mongodb";
//import { assert } from 'console';
import assert from 'assert';
import mongoose, { Schema , model, Model, Document } from 'mongoose';
//import { User, testUserModel } from './models/testUser';
import { User, testSchema } from './models/testUser';
import { connect } from './util/mongoTestService';

const MONGODB_USER = 'root';
const MONGODB_PASSWORD = 'root_password';
const url = 'mongodb://localhost:27017';
//const dbName = 'poc-mongodb';
const dbName = 'test-mongodb';


const start = async () => {

    //mongoose 
    await mongoose.connect(`${url}/${dbName}`);
    const User = mongoose.model<User>('testusers', testSchema);
    /**
    await User.create([
        { name: 'Monster', address: '20 fenwick'},
        { name: 'Item2Name', address: '2030 fenwick' },
        { name: 'John', address: '2810 deerwood' }
    ])
    */
    const query = await User.find();
    console.log(query);

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

/** 
    //test mongoose connection to database runned on docker
    mongoose.Promise = global.Promise;
    mongoose.connect(`${url}/${dbName}`)
        .then(() => console.log('Connected to mongodb Database.'))
        //.catch(() => {
        //    console.log('Failed to connect to mongodb Database.  Exiting')
        //    process.exit()
        //})
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

/** 
    //testing mongoDB connection with test Models
    interface TestUser extends Document {
        name: string;
        address: string;
    }

    let testSchema: Schema = new Schema({
        name: { type: String, required: true},
        address: { type: String, required: true}
    });

    let TestUser: Model<TestUser> = model('testUser', testSchema);

    let testUser: TestUser = await TestUser.create({
        name: 'Eye of Sauron',
        address: 'yellow brick road'
    })

    console.log('Done', testUser.name);

    await testUser.save();
*/
    /** 
    let testDoc = new testUserModel({
        name: 'Eye of Sauron',
        address: 'yellow brick road'
    });

    async function testRun(): Promise<void> {
        await testDoc.save();
        console.log(testDoc.address);
    }
    */

   /**  
   try {
    connect();
   } catch(e) {
       console.log("some error connecting");
   }
   */

   //testing
   
}

start().catch(err => console.log(err));
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
