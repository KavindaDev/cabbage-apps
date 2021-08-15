import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({

    content: { type: String, required: true },
    author: { type: String, required: true },
    createdTime: { type: Date, default: Date.now },
    lastUpdateTime: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true

    }
})

export interface Posts extends mongoose.Document {

    id: string;
    content: string;
    author: string;
    createdTime: Date;
    lastUpdatedTime: Date;
    users: {
        userId: object,
        Comment: string
    }

}