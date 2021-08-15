import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";

import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }

    //Add post
    @Post()
    async addPost(
        @Body('content') postContent: string,
        @Body('author') postAuthor: string,
        @Body('createdTime') postCreatedTime: Date,
        @Body('lastUpdatedTime') postLastUpdatedTime: Date,
        @Body('user') postUser: object
    ) {
        const generatedId = await this.postsService.addPost(postContent, postUser, postAuthor, postCreatedTime, postLastUpdatedTime);
        return { id: generatedId, postContent, postUser, postAuthor, postCreatedTime, postLastUpdatedTime, };
    }

    //get all posts
    @Get()
    async getAllPosts() {
        const posts = await this.postsService.getAllPosts();
        return posts;
    }

    //get by post id
    @Get(':postId')
    getPostById(@Param('postId') postId: string) {
        return this, this.postsService.getPostById(postId)
    }

    //update post by id
    @Patch(':postId')
    async updatePost(@Param('postId') postId: string,
        @Body('content') postContent: string,
        @Body('author') postAuthor: string,
        @Body('createdTime') postCreatedTime: Date,
        @Body('lastUpdatedTime') postLastUpdatedTime: Date,
    ) {
        await this.postsService.updatePost(postId, postContent, postAuthor, postCreatedTime, postLastUpdatedTime);
        return null;
    }

    //Delete post by Id
    @Delete(':postId')
    async deletePost(@Param('postId') postId: string) {
        await this.postsService.deleteProduct(postId);
        return null;
    }
}