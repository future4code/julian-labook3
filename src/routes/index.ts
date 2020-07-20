import {Router} from 'express'
import { signup } from '../endpoints/signup';
import { login } from '../endpoints/login';

export const routes = Router();

routes.post("/signup", signup);
routes.post("/login", login);