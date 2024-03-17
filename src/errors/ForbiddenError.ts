import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {
	constructor(
		message: string = "Desculpe, você não tem permissão para acessar este recurso."
	){
		super(403, message);
	}
}