import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { CustomError } from "../errors/CustomError";
import { CreatePostEditOutputDTO, CreatePostOutputDTO, PostDeleteInputDTO, PostDeleteOutPutDTO, PostDeleteSchema, PostInputDTO, PostInputEditDTO, PostOutputDTO, PostSchemaEdit, PostsInputDTO, PostsSchema, PostsSchemaDTO } from "../dto/posts";

export class PostController {
	constructor(
        protected postBusiness: PostBusiness
	){}
    
	public getAllPosts = async (req: Request, res: Response) => {
		try{
			const input: PostInputDTO = PostsSchemaDTO.parse(req.headers);
			const posts: Array<PostOutputDTO> = await this.postBusiness.getAllPosts(input);
			res.status(200).send(posts);
		}catch (err){
			if(err instanceof ZodError){
				res.status(400).send(err.issues);
			}else if (err instanceof CustomError){
				res.status(err.statusCode).send(err.message);
			}else{
				res.status(500).send(`Erro não tratado: DESC: ${err}`);
			}
            
		}
	}; //OK [✅]
	public createPosts = async (req: Request, res: Response) => {
		try{
			const input: PostsInputDTO = PostsSchema.parse({
				...req.headers,
				...req.body
			});
			const posts: CreatePostOutputDTO = await this.postBusiness.createPosts(input);
			res.status(201).send(posts);
		}catch (err){
			if(err instanceof ZodError){
				res.status(400).send(err.issues);
			}else if (err instanceof CustomError){
				res.status(err.statusCode).send(err.message);
			}else{
				res.status(500).send(`Erro não tratado: DESC: ${err}`);
			}
            
		}
	}; //OK [✅]
	public editPost = async (req: Request, res: Response) => {
		try{
			const input: PostInputEditDTO = PostSchemaEdit.parse({
				...req.body,
				idPost: req.params.id
			});
			const posts: CreatePostEditOutputDTO = await this.postBusiness.editPosts(input);
			res.status(200).send(posts);
		}catch (err){
			if(err instanceof ZodError){
				res.status(400).send(err.issues);
			}else if (err instanceof CustomError){
				res.status(err.statusCode).send(err.message);
			}else{
				res.status(500).send(`Erro não tratado: DESC: ${err}`);
			}
            
		}
	}; //OK [✅]
	public deletePost = async (req: Request, res: Response) => {
		try{
			const input: PostDeleteInputDTO = PostDeleteSchema.parse({
				id: req.params.id,
				authorization: req.headers.authorization
			});
			const posts: PostDeleteOutPutDTO = await this.postBusiness.deletePost(input);
			res.status(200).send(posts);
		}catch (err){
			if(err instanceof ZodError){
				res.status(400).send(err.issues);
			}else if (err instanceof CustomError){
				res.status(err.statusCode).send(err.message);
			}else{
				res.status(500).send(`Erro não tratado: DESC: ${err}`);
			}
            
		}
	};
}