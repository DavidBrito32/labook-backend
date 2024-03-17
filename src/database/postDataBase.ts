import { DataBase } from "./database";

export interface PostDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  creator_name: string;
}

export interface CreatePost {
  id: string;
  creator_id: string;
  content: string;
  created_at: string;
}

export interface EditPosts {
	idPost: string;
	content: string;
	updatedAt: string;
}

export class PostDataBase extends DataBase {
	public findAllPosts = async (): Promise<Array<PostDB>> => {
		const query = `
        SELECT 
            posts.id as id,
            posts.creator_id as creator_id,
            posts.content as content,
            COUNT(CASE WHEN likes_dislikes.like = 1 THEN 1 ELSE NULL END) as likes,
            COUNT(CASE WHEN likes_dislikes.dislike = 1 THEN 1 ELSE NULL END) as dislikes,
            posts.created_at as created_at,
            posts.updated_at as updated_at,
            users.name as creator_name
        FROM posts 
        INNER JOIN users ON users.id = posts.creator_id
        LEFT JOIN likes_dislikes ON likes_dislikes.post_id = posts.id
        GROUP BY posts.id, posts.creator_id, posts.content, posts.created_at, posts.updated_at, users.name;	
    `;
		const posts: Array<PostDB> = await DataBase.connection.raw(query);
		return posts;
	};

	public findPostById = async (id: string): Promise<Array<PostDB>>=> {
		const Post = await DataBase.connection("posts").select("*").where({id});
		return Post;
	};

	public findPostByUserId = async (id: string): Promise<Array<PostDB>>=> {
		const Post = await DataBase.connection("users").select("*").where({id});
		return Post;
	};

	public insertPost = async (input: CreatePost): Promise<void> => {
		const { id, creator_id, content, created_at } = input;
		await DataBase.connection("posts").insert({
			id,
			creator_id,
			content,
			created_at,
		});
	};

	public editPost = async (input: EditPosts): Promise<void> => {
		const { idPost, content, updatedAt } = input;
		await DataBase.connection("posts").update({
			content,
			updated_at: updatedAt
		}).where({id: idPost});
	};

	public deletePost = async (id: string): Promise<void> => {
		await DataBase.connection("posts").delete().where({id});
	};
}
