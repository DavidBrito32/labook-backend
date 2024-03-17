import { CustomError } from "./CustomError";

export class Unouthorized extends CustomError{
	constructor(
        public message: string = "Você não tem permissão para acessar este recurso",
	){
		super(401, message);
	}
}