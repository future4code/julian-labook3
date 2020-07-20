import { BaseDatabase } from "../service/BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public async signup(id:string, name: string, email: string, password: string): Promise<void>{
        try {
            return await this.getConnection().insert({id, name, email, password}).into(process.env.USER_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserByEmail(email: string): Promise<any>{
        try {
            const user = await this.getConnection().select('*').from(process.env.USER_DB_NAME).where({email})
            return user[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}