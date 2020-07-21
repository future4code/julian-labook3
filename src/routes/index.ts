import {Router} from 'express'
import { signup } from '../endpoints/signup';
import { login } from '../endpoints/login';
import { makeFriendship } from '../endpoints/makeFriendship';
import { undoFriendship } from '../endpoints/undoFriendship';

export const routes = Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/make-friendship", makeFriendship);
routes.delete("/undo-friendship", undoFriendship);