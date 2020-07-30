import { BaseDatabase } from '../service/BaseDatabase';

export class FriendsDatabase extends BaseDatabase {
    public async make(
        user_id: string, 
        user_to_follow_id: string
    ): Promise<void> {
        try {
            return await this.getConnection()
            .insert({
                user_id,
                user_to_follow_id
            })
            .into(process.env.FRIENDSHIP_DB_NAME);
        } catch(error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async undo(
        user_id: string,
        user_to_unfollow_id: string
    ): Promise<any> {
        try {
            return await this.getConnection()
            .delete()
            .from(process.env.FRIENDSHIP_DB_NAME)
            .where({user_id: user_id, user_to_follow_id: user_to_unfollow_id});

        } catch(error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}