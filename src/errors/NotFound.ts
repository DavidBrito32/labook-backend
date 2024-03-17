import { CustomError } from "./CustomError";

export class NotFound extends CustomError {
	constructor(message: string = "Ops. Verifique os dados informados e tente novamente"){
		super(400, message);
	}
}