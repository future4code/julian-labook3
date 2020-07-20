import {Request, Response} from 'express'
import {UserDatabase} from '../data/UserDatabase'
import { IdGenerator } from '../service/utils/IdGenerator';
import {HashManager} from '../service/utils/HashManager';

export const signup = async(req:Request, res: Response) => {
    try {
        const input = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        if(input.name.trim()==="" || input.email.trim()==="" || input.password.trim()===""){
            throw new Error("Please fill all the fields")
        }

        const idGenerator = new IdGenerator;
        const id = await idGenerator.generate();

        const hashManager = new HashManager
        const hashedPassword = await hashManager.hash(input.password)

        const userDB = new UserDatabase;
        await userDB.signup(id, input.name, input.email, hashedPassword)

        res.status(200).send({message: "Usuário criado com sucesso"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}