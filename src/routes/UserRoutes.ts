import {Router} from 'express';
import { UserController } from '../controller/UserController';

const userController = new UserController();
export const userRoutes = Router();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.post("/friendship", userController.makeFriendship);
userRoutes.delete("/friendship", userController.undoFriendship);