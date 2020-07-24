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

    public async like(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.like(req.headers.authorization, req.body.post_id);

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    public async dislike(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.dislike(req.headers.authorization, req.body.post_id);

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    public async comment(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.comment(req.headers.authorization, req.params.post_id, req.body.commentText)

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    public async getCommentsByPostId(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            const comments = await postBusiness.getCommentsByPostId(req.headers.authorization, req.params.post_id)

            res.status(200).send(comments);
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}