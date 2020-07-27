import { BaseDatabase } from "../service/BaseDatabase";

export class LikesDatabase extends BaseDatabase{
    public async like(user_id: string, post_id: string){
        try{
            return await this.getConnection().insert({user_id, post_id}).into(process.env.LIKES_DB_NAME);
        }
        catch(error){
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async dislike(user_id: string, post_id: string){
        try {
            return await this.getConnection().delete().from(process.env.LIKES_DB_NAME).where({user_id, post_id});
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}