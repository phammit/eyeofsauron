//testing mongodb usage 
import mongoose, { Schema, Document } from 'mongoose';



//create an interface representing a document: user in MongoDB
//TypeScript
export interface User {
    id: string,
    name: string;
    address: String;
}

//create a schema corresponding to the document interface: User
export let testSchema = new Schema<User>({
    id: { type: String},
    name: { type: String, required: true},
    address: { type: String, required: true},
});

//create a model
//'testusers' will be the 
export default mongoose.model<User>('test', testSchema);



