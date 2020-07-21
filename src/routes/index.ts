import {Router} from 'express'
import { signup } from '../endpoints/signup';
import { login } from '../endpoints/login';
import { makeFriendship } from '../endpoints/makeFriendship';
import { undoFriendship } from '../endpoints/undoFriendship';
import { createPost } from '../endpoints/createPost';
import { feed } from '../endpoints/feed';

export const routes = Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/make-friendship", makeFriendship);
routes.delete("/undo-friendship", undoFriendship);
routes.post("/post", createPost);
routes.get("/feed", feed);
routes.get("/feed/:type", feed);