import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './post/posts.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [PostsModule, UserModule,
    MongooseModule.forRoot('mongodb+srv://kavinda:kavin1212@cluster0.orf1f.mongodb.net/CabbageAppsBackend?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
