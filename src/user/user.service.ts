import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Users } from "./user.model";

@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<Users>) { }

    private users: Users[] = [];

    async addUser(name: string, numberOfPosts: number, createdTime: Date) {
        const newUser = new this.userModel({
            name,
            numberOfPosts, createdTime
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async getAllUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        console.log(result)
    }


    async getUserById(userId: string) {
        let user;
        try {
            user = await this.findPost(userId);
        } catch (error) {
            throw new NotFoundException('No such post found');
        }
        if (!user) {
            throw new NotFoundException('No such post found');
        }

        return { id: user.id, name: user.name };
    }


    private async findPost(id: string): Promise<Users> {
        const users = await this.userModel.findById(id);
        if (!users) {
            throw new NotFoundException('No user found');
        }
        return users;
    }



}