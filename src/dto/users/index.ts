import { z } from "zod";

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}


export interface LoginInputDTO {
    email: string;
	password: string;
}

export interface CreateUserInputDTO {
    name: string;
    email: string;
    password: string;
    role: USER_ROLES;
}

export interface CreateUserOutputDTO {
	message: string;
	token: string;
}

export interface LoginOutputDTO {
	message: string;
	token: string;
}


export const LoginUserSchema = z.object({
	email: z.string({
		required_error: "'email' - é um campo obrigatorio",
		invalid_type_error: "'email' - deve ser enviado no formato string"
	}).min(2).email(),
	password: z.string({
		required_error: "'password' - é um campo obrigatorio",
		invalid_type_error: "'password' - deve ser enviado no formato string"
	})
}).transform(data => data as LoginInputDTO);


export const InsertUserSchema = z.object({
	name: z.string({
		required_error: "'name' -  É um dado obrigatorio",
		invalid_type_error: "'name' - Deve ser do tipo string"
	}).min(2),
	email: z.string({
		required_error: "'email' -  É um dado obrigatorio",
		invalid_type_error: "'email' - Deve ser do tipo string"
	}).min(2).email(),
	password: z.string({
		required_error: "'password' -  É um dado obrigatorio",
		invalid_type_error: "'password' - Deve ser do tipo string"
	}).min(8),
	// role: z.string({
	// 	required_error: "'role' -  É um dado obrigatorio",
	// 	invalid_type_error: "'role' - Deve ser do tipo string"
	// })
	role: z.enum([USER_ROLES.ADMIN, USER_ROLES.NORMAL])
}).transform(data => data as CreateUserInputDTO);