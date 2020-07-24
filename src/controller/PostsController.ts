import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostsController {

    public async createPost(req: Request, res: Response) {
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.createPost(
                req.headers.authorization, 
                req.body.description,
                req.body.type,
                req.body.photo
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

    public async feed(req: Request, res: Response) {
        try {

            const postBusiness = new PostBusiness();
            const result = await postBusiness.feed(req.headers.authorization, req.params.type);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

}