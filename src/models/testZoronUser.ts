import mongoose, { Schema, Document, Types } from 'mongoose';
//create an interface representing a document: user in MongoDB
//TypeScript
export interface ZoronUser {
    _id: Types.ObjectId;
    name: string;
    address: String;
}

//create a schema corresponding to the document interface: User
export let testSchema = new Schema<ZoronUser>({
    _id: { type: Schema.Types.ObjectId},
    name: { type: String, required: true},
    address: { type: String, required: true},
});

//create a model
//'testusers' will be the 
//tests will be the collection name
export default mongoose.model<ZoronUser>('zoronusertest', testSchema);