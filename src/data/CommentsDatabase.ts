import { BaseDatabase } from "../service/BaseDatabase";

export class CommentsDatabase extends BaseDatabase{
    public async comment(id: string, user_id: string, post_id: string, comment: string){
        await this.getConnection().insert({id, user_id, post_id, comment}).into(process.env.COMMENTS_DB_NAME)
    }

    public async getCommentsByPostId(post_id: string){
        const comments = await this.getConnection()
            .select(
                `${process.env.USER_DB_NAME}.name as name`,
                `${process.env.COMMENTS_DB_NAME}.comment as comment`
            )
            .from(process.env.COMMENTS_DB_NAME)
            .join(
                `${process.env.USER_DB_NAME}`, 
                `${process.env.COMMENTS_DB_NAME}.user_id`, 
                `${process.env.USER_DB_NAME}.id`
            )
            .where({post_id});

        return comments;
    }
}