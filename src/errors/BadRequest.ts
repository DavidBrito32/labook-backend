import { CustomError } from "./CustomError";

export class BadRequest extends CustomError {
	constructor(message: string = "Desculpe, houve um problema com a sua solicitação"){
		super(400, message);
	}
}