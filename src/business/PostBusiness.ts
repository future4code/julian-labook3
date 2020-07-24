import { Authenticator } from "../service/utils/Authenticator"
import { IdGenerator } from "../service/utils/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";
import moment from 'moment';
import { LikesDatabase } from "../data/LikesDatabase";
import { CommentsDatabase } from "../data/CommentsDatabase";

export class PostBusiness {
    public async createPost(token: string, description: string, type: string, photo?:string) {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const postDatabase = new PostDatabase();
        await postDatabase.createPost(
            authenticationData.id,
            id,
            description,
            type,
            photo
        )
    }

    public async feed(token: string, type?:string) {
        const authenticator = new Authenticator;
        const userData = authenticator.getData(token)

        const postDatabase = new PostDatabase
        const data = await postDatabase.getFeed(userData.id);


        data.forEach((post: any) => {
            post.createdAt = moment(post.createdAt).format("DD/MM/YYYY")
        })

        if (!type) {
            console.log(data)
            return data;
        }
        else if (type === "normal" || type === "event") {
            const novoArray = data.filter((post: any) => {
                return post.type === type
            })
            return novoArray;
        }
        else {
            throw new Error("Invalid parameter");
        }
    }

    public async like(token: string, post_id: string){
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        const likesDatabase = new LikesDatabase;
        await likesDatabase.like(authenticationData.id, post_id);
    }

    public async dislike(token: string, post_id: string){
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        const likesDatabase = new LikesDatabase;
        await likesDatabase.dislike(authenticationData.id, post_id);
    }

    public async comment(token: string, post_id: string, text: string){
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const commentsDatabase = new CommentsDatabase;
        await commentsDatabase.comment(id, authenticationData.id, post_id, text)

    }
    
    public async getCommentsByPostId(token: string, post_id: string){
        const authenticator = new Authenticator;
        const authenticationData = authenticator.getData(token);

        const commentsDatabase = new CommentsDatabase;
        const comments = await commentsDatabase.getCommentsByPostId(post_id)

        return comments;
    }
}