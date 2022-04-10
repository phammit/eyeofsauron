//testing mongodb usage 
import mongoose, { Schema, Document } from 'mongoose';



//create an interface representing a document: user in MongoDB
export interface User {
    name: string;
    address: String;
}

//create a schema corresponding to the document interface: User
export let testSchema = new Schema<User>({
    name: { type: String, required: true},
    address: { type: String, required: true},
});

//create a model
export default mongoose.model<User>('testusers', testSchema);



