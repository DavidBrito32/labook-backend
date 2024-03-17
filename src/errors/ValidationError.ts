import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
	constructor(message: string = "A solicitação contém dados inválidos ou ausentes. Por favor, verifique os campos fornecidos e tente novamente.") {
		super(422, message);
	}
}
