import {Router} from 'express';
import { PostsController } from '../controller/PostsController';

export const postRouter = Router();
const postsController = new PostsController();

postRouter.post("/create", postsController.createPost);
postRouter.get("/feed", postsController.feed);
postRouter.get("/feed/:type", postsController.feed);