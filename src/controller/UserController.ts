import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../service/BaseDatabase';

export class UserController extends BaseDatabase {

    public async signup(req: Request, res: Response) {
        try {

            const userBusiness = new UserBusiness();
            const result = await userBusiness.signup(req.body.name, req.body.email, req.body.password);
            
            res.status(200).send({ token: result, message: "Usuário criado com sucesso" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
        this.destroyConnection();
    }

    public async login(req: Request, res: Response) {
        try {
            const userBusiness = new UserBusiness();
            const result = await userBusiness.login(req.body.email, req.body.password)

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
        this.destroyConnection();
    }

    public async makeFriendship(req: Request, res: Response) {
        try {
            
            const userBusiness = new UserBusiness();
            await userBusiness.makeFriendship(req.headers.authorization, req.body.user_to_follow_id)

            res.status(200).send({ message: "Successful friendship" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
        this.destroyConnection();
    }

    public async undoFriendship(req: Request, res: Response) {
        try {

            const userBusiness = new UserBusiness();
            await userBusiness.undoFriendship(req.headers.authorization, req.body.user_to_unfollow_id)

            res.status(200).send({ message: "Friendship successfully broken" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
        this.destroyConnection();
    }
}
