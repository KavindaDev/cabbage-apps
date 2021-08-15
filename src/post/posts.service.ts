import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Posts } from "./posts.model";

@Injectable()
export class PostsService {

    constructor(@InjectModel('Posts') private readonly postModel: Model<Posts>) { }

    private posts: Posts[] = [];

    async addPost(content: string, user: object, author: string, createdTime: Date, lastUpdatedTime: Date) {
        const newPost = new this.postModel({ content, user, author, createdTime, lastUpdatedTime, });
        const result = await newPost.save();
        return result.id as string;
    }

    async getAllPosts() {
        const posts = await this.postModel.find().populate('users');
        return posts;
    }

    async getPostById(postId: string) {
        let post;
        try {
            post = await this.findPost(postId);
        } catch (error) {
            throw new NotFoundException('No such post found');
        }
        if (!post) {
            throw new NotFoundException('No such post found');
        }

        return { id: post.id, content: post.content, author: post.author, createdTime: post.createdTime, lastUpdatedTime: post.lastUpdatedTime };
    }

    async updatePost(postId: string, content: string, author: string, createdTime: Date, lastUpdatedTime: Date) {

        const updatedPost = await this.findPost(postId);

        if (content) {
            updatedPost.content = content;
        }
        if (author) {
            updatedPost.author = author;
        }
        if (createdTime) {
            updatedPost.createdTime = createdTime;
        }
        if (lastUpdatedTime) {
            updatedPost.lastUpdatedTime = lastUpdatedTime;
        }
        updatedPost.save();
    }

    private async findPost(id: string): Promise<Posts> {
        const posts = await this.postModel.findById(id);
        if (!posts) {
            throw new NotFoundException('No post found');
        }
        return posts;
    }

    //Delete product By Id
    async deleteProduct(postId: string) {
        const result = await this.postModel.deleteOne({ _id: postId }).exec();
        console.log(result)
    }
}