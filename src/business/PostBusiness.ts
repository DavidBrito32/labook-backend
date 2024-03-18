import { CreatePost, LikeDislikeDB, PostDB, PostDataBase } from "../database/postDataBase";import { PostsInputDTO, CreatePostOutputDTO, PostOutputDTO, PostInputEditDTO, CreatePostEditOutputDTO, PostDeleteInputDTO, PostDeleteOutPutDTO, PostInputDTO, LikePostInputDTO } from "../dto/posts";
import { BadRequest } from "../errors/BadRequest";
import { NotFound } from "../errors/NotFound";
import { Post } from "../models/Post";
import { TokenManager } from "../services/token";
import { IdGenerator } from "../services/uuid";
import { Unouthorized } from "./../errors/Unouthorized";

export class PostBusiness {
	constructor(
        protected postDatabase: PostDataBase,
		protected idGenerator: IdGenerator,
		protected tokenManager: TokenManager
	){}
	public getAllPosts = async (input: PostInputDTO): Promise<Array<PostOutputDTO>> => {
		const { authorization } = input;

		const verifyToken = this.tokenManager.getPayload(authorization.split(" ")[1]);

		if(verifyToken === null){
			throw new Unouthorized();
		}

		const Posts = await this.postDatabase.findAllPosts();
		const PostModel: Array<PostOutputDTO> = Posts.map(post => new Post(post.id, post.creator_id, post.content, post.likes, post.dislikes, post.created_at, post.updated_at, post.creator_name).getModel());
		return PostModel;
	}; //OK [✅] TOKENIZAÇÃO OK ✅

	public createPosts = async (input: PostsInputDTO): Promise<CreatePostOutputDTO> => {
		const { creatorId, content, authorization } = input;
		const autorizado = this.tokenManager.getPayload(authorization.split(" ")[1]);
		if(autorizado === null){
			throw new Unouthorized();
		}
		const [exists]: Array<PostDB> = await this.postDatabase.findPostByUserId(creatorId);

		if(!exists){
			throw new BadRequest("Verifique os dados informados e tente novamente");
		}
		const ID = this.idGenerator.generate();
		const post: CreatePost = {
			id: ID,
			content,
			creator_id: creatorId,
			created_at: new Date().toISOString()
		};		
		await this.postDatabase.insertPost(post);		
		const output: CreatePostOutputDTO = {
			message: "Post Criado com sucesso"
		};
		return output;	
	}; //OK [✅] TOKENIZAÇÃO OK ✅

	public editPosts = async (input: PostInputEditDTO): Promise<CreatePostEditOutputDTO> =>{	
		const autorizado = this.tokenManager.getPayload(input.authorization.split(" ")[1]);
		if(autorizado === null){
			throw new Unouthorized();
		}

		const [exists]: Array<PostDB> = await this.postDatabase.findPostById(input.idPost);
		if(!exists){
			throw new BadRequest("'post' - não localizado");
		}
		
		const editar = {
			idPost: input.idPost,
			content: input.content || exists.content,
			updatedAt: new Date().toISOString()
		};
		
		await this.postDatabase.editPost(editar);
		const output: CreatePostOutputDTO = {
			message: "Post Editado com sucesso"
		};

		return output;
	}; //OK [✅] TOKENIZAÇÃO OK ✅

	public deletePost = async (input: PostDeleteInputDTO): Promise<PostDeleteOutPutDTO> => {
		const { id, authorization } = input;
		const autorizado = this.tokenManager.getPayload(authorization.split(" ")[1]);

		if(autorizado === null){
			throw new Unouthorized();
		}
		const [exists]: Array<PostDB> = await this.postDatabase.findPostById(id);
		if(!exists){
			throw new NotFound("Verifique os dados informados e tente novamente!");
		}

		await this.postDatabase.deletePost(exists.id);
		const output: PostDeleteOutPutDTO = {
			message: "Post Deletado com sucesso!"
		};

		return output;
	}; //OK [✅] TOKENIZAÇÃO OK ✅

	public likePost = async (input: LikePostInputDTO): Promise<void> => {
		const { postID, like, authorization }: LikePostInputDTO = input;
		const autorizado = this.tokenManager.getPayload(authorization.split(" ")[1]);

		if(autorizado === null){
			throw new Unouthorized();
		}

		const deuLike: LikeDislikeDB | undefined = await this.postDatabase.findLikeDislike({
			user_id: autorizado.id,
			post_id: postID
		});

		if (like && !deuLike) {
			const inputLike = {
				user_id: autorizado.id,
				post_id: postID,
				like: 1,
				dislike: 0
			};
			await this.postDatabase.insertLike(inputLike);
		} else if (like && deuLike && deuLike.like > 0) {
			const inputLike = {
				user_id: autorizado.id,
				post_id: postID,
				like: 0,
				dislike: 0
			};
			await this.postDatabase.updateLikeDislike(inputLike);
			return;
		} else if (like && deuLike && deuLike.dislike < 1 && deuLike.like === 0) {
			const inputLike = {
				user_id: autorizado.id,
				post_id: postID,
				like: 1,
				dislike: 0
			};
			await this.postDatabase.updateLikeDislike(inputLike);
		} else if (!like && deuLike && deuLike.dislike === 0 && deuLike.like === 0){
			const inputLike = {
				user_id: autorizado.id,
				post_id: postID,
				like: 0,
				dislike: 1
			};
			await this.postDatabase.updateLikeDislike(inputLike);
		}else{
			const inputLike = {
				user_id: autorizado.id,
				post_id: postID,
				like: 0,
				dislike: 0
			};
			await this.postDatabase.updateLikeDislike(inputLike);
		}
	}; //OK [✅] TOKENIZAÇÃO OK ✅
}