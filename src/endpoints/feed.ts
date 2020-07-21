import { Request, Response } from "express";
import { PostDatabase } from "../data/PostDatabase";
import { Authenticator } from "../service/utils/Authenticator";
import moment from 'moment'

export const feed = async(req: Request, res: Response) => {
    try {
        const authenticator = new Authenticator;
        const userData = authenticator.getData(req.headers.authorization)

        const postDatabase = new PostDatabase
        const data = await postDatabase.getFeed(userData.id);

        data.forEach((post: any) => {
            post.createdAt = moment(post.createdAt).format("DD/MM/YYYY")
        })

        if(!req.params.type){
            res.status(200).send(data);
        }
        else if(req.params.type === "normal" || req.params.type==="event"){
            const novoArray = data.filter((post:any) => {
                return post.type === req.params.type
            })
            res.status(200).send(novoArray)
        }
        else{
            throw new Error("Invalid parameter");
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}