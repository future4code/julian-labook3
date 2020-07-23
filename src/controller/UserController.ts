import { Request, Response } from 'express'
import { UserDatabase } from '../data/UserDatabase'
import { IdGenerator } from '../service/utils/IdGenerator';
import { HashManager } from '../service/utils/HashManager';
import { Authenticator } from '../service/utils/Authenticator';
import { FriendsDatabase } from '../data/FriendsDatabase'

export class UserController {

    public async signup(req: Request, res: Response) {
        try {
            const input = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            if (input.name.trim() === "" || input.email.trim() === "" || input.password.trim() === "") {
                throw new Error("Please fill all the fields")
            }

            const idGenerator = new IdGenerator;
            const id = await idGenerator.generate();

            const hashManager = new HashManager
            const hashedPassword = await hashManager.hash(input.password)

            const userDB = new UserDatabase;
            await userDB.signup(id, input.name, input.email, hashedPassword)

            res.status(200).send({ message: "Usuário criado com sucesso" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const input = {
                email: req.body.email,
                password: req.body.password
            }

            const userDB = new UserDatabase;
            const user = await userDB.getUserByEmail(input.email)

            const hashManager = new HashManager;
            const isValidPassword = await hashManager.checkHash(input.password, user.password)

            if (!isValidPassword) {
                throw new Error("Invalid credentials");
            }

            const authenticator = new Authenticator;
            const token = authenticator.generateToken({ id: user.id, name: user.name, email: user.email })

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public async makeFriendship(req: Request, res: Response) {
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

            res.status(200).send({ message: "Successful friendship" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    public async undoFriendship(req: Request, res: Response) {
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

            res.status(200).send({ message: "Friendship successfully broken" })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}
