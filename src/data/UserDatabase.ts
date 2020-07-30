import { BaseDatabase } from "../service/BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase{
    private dataToModel(data?: any): User | undefined {
        return data && new User(data.id, data.name, data.email, data.password);
    }

    public async signup(user: User): Promise<void>{
        try {
            return await this.getConnection().insert({id: user.getId(), name: user.getName(), email: user.getEmail(), password: user.getPassword()}).into(process.env.USER_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserByEmail(email: string): Promise<User>{
        try {
            const user = await this.getConnection().select('*').from(process.env.USER_DB_NAME).where({email})
            return this.dataToModel(user[0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}