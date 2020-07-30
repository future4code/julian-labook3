import {Router} from 'express'
import { userRoutes } from './UserRoutes';
import { postRouter } from './PostRouter';


export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/post", postRouter);