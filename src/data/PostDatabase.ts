import {BaseDatabase} from "../service/BaseDatabase"

export class PostDatabase extends BaseDatabase{

    public async createPost(creator_id: string, id: string, description: string, type?:string, photo?: string): Promise<void> {
        try {
            return await this.getConnection()
            .insert ({
                creator_id,
                id,
                description,
                type,
                photo
            })
            .into(process.env.POSTS_DB_NAME)
        }catch(error){
             throw new Error(error.sqlMessage || error.message)
             
        }
    }

    public async getAllFeed(user_id: string, limit: number, page: number): Promise<any>{
        try {
            const offset: number = limit * (page - 1);

            const feed = await this.getConnection()
                .select(`${process.env.POSTS_DB_NAME}.id as id`, 
                    `${process.env.POSTS_DB_NAME}.photo as photo`,
                    `${process.env.POSTS_DB_NAME}.description as description`, 
                    `${process.env.POSTS_DB_NAME}.created_at as createdAt`, 
                    `${process.env.POSTS_DB_NAME}.creator_id as userId`,
                    `${process.env.POSTS_DB_NAME}.type as type`,
                    `${process.env.USER_DB_NAME}.name as userName`
                )
                .from(process.env.POSTS_DB_NAME)
                .join(process.env.FRIENDSHIP_DB_NAME, `${process.env.POSTS_DB_NAME}.creator_id`,
                    `${process.env.FRIENDSHIP_DB_NAME}.user_to_follow_id`
                )
                .join(process.env.USER_DB_NAME, `${process.env.POSTS_DB_NAME}.creator_id`, 
                    `${process.env.USER_DB_NAME}.id`
                )
                .where(`${process.env.FRIENDSHIP_DB_NAME}.user_id`, "=", user_id)
                .orderBy(`${process.env.POSTS_DB_NAME}.created_at`, "DESC")
                .limit(limit)
                .offset(offset)
                
                return feed
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getFiltteredFeed(user_id: string, type: string, limit: number, page: number): Promise<any>{
        try {
            const offset: number = limit * (page-1);

            const feed = await this.getConnection()
                .select(`${process.env.POSTS_DB_NAME}.id as id`, 
                    `${process.env.POSTS_DB_NAME}.photo as photo`,
                    `${process.env.POSTS_DB_NAME}.description as description`, 
                    `${process.env.POSTS_DB_NAME}.created_at as createdAt`, 
                    `${process.env.POSTS_DB_NAME}.creator_id as userId`,
                    `${process.env.POSTS_DB_NAME}.type as type`,
                    `${process.env.USER_DB_NAME}.name as userName`
                )
                .from(process.env.POSTS_DB_NAME)
                .join(process.env.FRIENDSHIP_DB_NAME, `${process.env.POSTS_DB_NAME}.creator_id`,
                    `${process.env.FRIENDSHIP_DB_NAME}.user_to_follow_id`
                )
                .join(process.env.USER_DB_NAME, `${process.env.POSTS_DB_NAME}.creator_id`, 
                    `${process.env.USER_DB_NAME}.id`
                )
                .where(`${process.env.FRIENDSHIP_DB_NAME}.user_id`, "=", user_id)
                .andWhere(`${process.env.POSTS_DB_NAME}.type`, "=", type)
                .orderBy(`${process.env.POSTS_DB_NAME}.created_at`, "DESC")
                .limit(limit)
                .offset(offset)
                
                return feed
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}