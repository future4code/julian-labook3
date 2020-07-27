import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseDatabase } from "../service/BaseDatabase";

export class PostsController extends BaseDatabase {

    public async createPost(req: Request, res: Response) {
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.createPost(
                req.headers.authorization, 
                req.body.description,
                req.body.type || "normal",
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
        this.destroyConnection();
    }

    public async feed(req: Request, res: Response) {
        try {

            const postBusiness = new PostBusiness();
            const result = await postBusiness.feed(
                req.headers.authorization, 
                req.query.type as string, 
                Number(req.query.limit) || 5,
                Number(req.query.page) || 1
            );

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send(error.message)
        }
        this.destroyConnection();
    }

    public async like(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.like(req.headers.authorization, req.params.post_id);

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message)
        }
        this.destroyConnection();
    }

    public async dislike(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.dislike(req.headers.authorization, req.params.post_id);

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message)
        }
        this.destroyConnection();
    }

    public async comment(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            await postBusiness.comment(req.headers.authorization, req.params.post_id, req.body.text)

            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message);
        }
        this.destroyConnection();
    }

    public async getCommentsByPostId(req: Request, res: Response){
        try {
            const postBusiness = new PostBusiness();
            const comments = await postBusiness.getCommentsByPostId(req.headers.authorization, req.params.post_id)

            res.status(200).send(comments);
        } catch (error) {
            res.status(400).send(error.message)
        }
        this.destroyConnection();
    }
}