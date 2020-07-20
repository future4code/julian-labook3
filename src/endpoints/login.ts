import {Request, Response} from 'express'
import {UserDatabase} from '../data/UserDatabase'
import {HashManager} from '../service/utils/HashManager';
import { Authenticator } from '../service/utils/Authenticator';

export const login = async(req:Request, res: Response) => {
    try {
        const input = {
            email: req.body.email,
            password: req.body.password
        }

        const userDB = new UserDatabase;
        const user = await userDB.getUserByEmail(input.email)

        const hashManager = new HashManager;
        hashManager.checkHash(input.password, user.password)

        const authenticator = new Authenticator;
        const token = authenticator.generateToken({id: user.id, name: user.name, email: user.email})

        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}