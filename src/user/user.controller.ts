import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { Users } from "./user.model";

import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }


    //Add new user
    @Post()
    async addUser(
        @Body('name') addName: string,
        @Body('numberOfPosts') addNumberOfPosts: number,
        @Body('createdTime') addCreatedTime: Date
    ) {
        const generatedId = await this.userService.addUser(addName, addNumberOfPosts, addCreatedTime);
        return { id: generatedId, addName, addNumberOfPosts, addCreatedTime };
    }

    //Get all users
    @Get()
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users;
    }

    //Delete user by Id
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        await this.userService.deleteUser(userId);
        return null;
    }

    //get user by Id
    @Get(':userId')
    getPostById(@Param('userId') userId: string) {
        return this, this.userService.getUserById(userId)
    }


}