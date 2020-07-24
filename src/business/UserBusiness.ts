import { IdGenerator } from "../service/utils/IdGenerator";
import { HashManager } from "../service/utils/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../service/utils/Authenticator";
import { FriendsDatabase } from "../data/FriendsDatabase";
import { User } from "../model/User";

export class UserBusiness {
    public async signup(name: string, email: string, password: string) {

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            throw new Error("Please fill all the fields")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashedPassword = await hashManager.hash(password)

        const user = new User(id, name, email, hashedPassword);

        const userDB = new UserDatabase();
        await userDB.signup(user)

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ id, name, email })


        return token;
    }

    public async login(email: string, password: string) {

        const userDB = new UserDatabase;
        const user = await userDB.getUserByEmail(email)

        const hashManager = new HashManager;
        const isValidPassword = await hashManager.checkHash(password, user.getPassword())

        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const authenticator = new Authenticator;
        const token = authenticator.generateToken({ 
            id: user.getId(), 
            name: user.getName(), 
            email: user.getEmail() 
        })

        return {token};
    }

    public async makeFriendship(token: string, user_to_follow_id: string) {

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const friendsDb = new FriendsDatabase();
        await friendsDb.make(
            authenticationData.id,
            user_to_follow_id
        )
    }

    public async undoFriendship(token: string, user_to_unfollow_id: string) {

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const friendsDb = new FriendsDatabase()
        await friendsDb.undo(
            authenticationData.id,
            user_to_unfollow_id
        )
    }
}