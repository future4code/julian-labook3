import {Router} from 'express';
import { PostsController } from '../controller/PostsController';

export const postRouter = Router();
const postsController = new PostsController();

postRouter.post("/create", postsController.createPost);
postRouter.get("/feed", postsController.feed);
postRouter.get("/feed/:type", postsController.feed);
postRouter.post("/like", postsController.like);
postRouter.delete("/like", postsController.dislike);
postRouter.post("/:post_id/comment", postsController.comment);
postRouter.get("/:post_id/comment", postsController.getCommentsByPostId);