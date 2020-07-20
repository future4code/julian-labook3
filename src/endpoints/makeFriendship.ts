import { Request, Response } from 'express'
import { FriendsDatabase } from '../data/FriendsDatabase'
import { Authenticator } from '../service/utils/Authenticator';

export const makeFriendship = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const input = {
            user_to_follow_id: req.body.user_to_follow_id
        }
        
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const friendsDb = new FriendsDatabase()
        await friendsDb.make(
            authenticationData.id,
            input.user_to_follow_id
        )
        
        res.status(200).send({message: "Successful friendship"})
    } catch(error) {
        res.status(400).send({message: error.message})
    }
}