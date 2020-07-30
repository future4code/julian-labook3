import {Router} from 'express';
import { PostsController } from '../controller/PostsController';

export const postRouter = Router();
const postsController = new PostsController();

postRouter.post("/create", postsController.createPost);
postRouter.get("/feed", postsController.feed);
postRouter.post("/like/:post_id", postsController.like);
postRouter.delete("/like/:post_id", postsController.dislike);
postRouter.post("/comments/:post_id", postsController.comment);
postRouter.get("/comments/:post_id", postsController.getCommentsByPostId);