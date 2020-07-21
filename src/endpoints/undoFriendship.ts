import { Request, Response } from 'express'
import { FriendsDatabase } from '../data/FriendsDatabase'
import { Authenticator } from '../service/utils/Authenticator';

export const undoFriendship = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const input = {
            user_to_unfollow_id: req.body.user_to_unfollow_id
        }
        
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const friendsDb = new FriendsDatabase()
        await friendsDb.undo(
            authenticationData.id,
            input.user_to_unfollow_id
        )
        
        res.status(200).send({message: "Friendship successfully broken"})
    } catch(error) {
        res.status(400).send({message: error.message})
    }
}