import {Request, Response} from "express";
import { Authenticator } from "../service/utils/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator} from "../service/utils/IdGenerator"
import { PostDatabase} from "../data/PostDatabase"

export const createPost = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getData(token)

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const {description, type, photo} = req.body

        const postDatabase = new PostDatabase()
        await postDatabase.createPost(
            authenticationData.id,
            id,
            description,
            type,
            photo
        )
    res.status(200).send({
            message: "Post criado!!"
          });

    } catch (error) {
        res.status(400).send({
            message: error.message
            
        })
    }
}