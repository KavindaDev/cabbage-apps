import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({

    name: { type: String },
    numberOfPosts: { type: Number },
    createdTime: { type: Date, default: Date.now },

});


export interface Users extends mongoose.Document {

    id: string;
    name: string;
    numberOfPosts: number;
    createdTime: Date

}