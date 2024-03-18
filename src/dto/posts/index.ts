import { z } from "zod";

export type PostUser = {
	id: string;
	name: string
}

export interface PostInputDTO {
	authorization: string;
}

export const PostsSchemaDTO = z.object({
	authorization: z.string({
		invalid_type_error: "'authorization' - deve vir em formato string",
		required_error: "'authorization' - é obrigatorio para esta operação"
	})
}).transform(data => data as PostInputDTO);

export interface PostsInputDTO {
    creatorId: string;
    content: string;
	authorization: string;
}

export interface PostInputEditDTO {
	idPost: string;
	content?: string;
	authorization: string;
}

export interface PostDeleteInputDTO {
	id: string;
	authorization: string;
}

export const PostDeleteSchema = z.object({
	id: z.string({
		invalid_type_error: "'id' - deve ser enviado em formato string",
		required_error: "'id' - é um campo obrigatorio"
	}).min(2),
	authorization: z.string({
		invalid_type_error: "'authorization' - deve ser enviado em formato string",
		required_error: "'authorization' - é um campo obrigatorio"
	}).min(2)
}).transform(data => data as PostDeleteInputDTO);

export interface PostDeleteOutPutDTO {
	message: string;
}
export interface PostDataInputDTO {
    creatorId: string;
    content: string;
    createdAt: string;

}
export interface CreatePostOutputDTO {
    message: string;
}
export interface CreatePostEditOutputDTO {
    message: string;
}
export interface PostOutputDTO {
	id: string;
	content: string;
	likes: number;
	dislikes: number;
	createdAt: string;
	updatedAt: string;
	creator: PostUser;
}

export const PostsSchema = z.object({
	content: z.string({
		invalid_type_error: "'content' precisa ser uma string",
		required_error: "'content' é obrigatorio"
	}).min(2),
	creatorId: z.string({
		invalid_type_error: "'creatorId' precisa ser uma string",
		required_error: "'creatorId' é obrigatorio"
	}).min(2),
	authorization: z.string({
		invalid_type_error: "'Authorization' precisa ser uma string",
		required_error: "'Authorization' é obrigatorio"
	})
}).transform(data => data as PostsInputDTO);

export const PostSchemaEdit = z.object({
	idPost: z.string({
		invalid_type_error: "'idPost' - deve ser uma string",
		required_error: "'idPost' - é um campo obrigatorio"
	}).min(2),
	content: z.string({invalid_type_error: "'content' - deve ser uma string"}).min(2).optional(),
	authorization: z.string({
		invalid_type_error: "'authorization' - deve ser uma string",
		required_error: "'authorization' - é um campo obrigatorio"
	}).min(2)
}).transform(data => data as PostInputEditDTO);


// LIKE POSTS

export interface LikePostInputDTO {
	postID: string;
	like: boolean;
	authorization: string;
}

export const LikePostSchema = z.object({
	postID: z.string({
		invalid_type_error: "'postID' - deve ser uma string",
		required_error: "'postID' - é um campo obrigatorio"}
	).min(2),
	like: z.boolean({
		invalid_type_error: "'like' - deve ser do tipo boolean",
		required_error: "'like' - é um campo obrigatorio"
	}),
	authorization: z.string({
		invalid_type_error: "'authorization' - deve ser do tipo boolean",
		required_error: "'authorization' - é um campo obrigatorio"
	}).min(2)
}).transform(data => data as LikePostInputDTO);