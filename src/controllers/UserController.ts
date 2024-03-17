import { Response, Request } from "express";
import { ZodError } from "zod";
import { CustomError } from "../errors/CustomError";
import { UserBusiness } from "../business/UserBusiness";
import { CreateUserInputDTO, InsertUserSchema, LoginInputDTO, LoginUserSchema } from "../dto/users";

export class UserContoller {
	constructor(protected userBusiness: UserBusiness){}
	public login = async (req: Request, res: Response) => {
		try{
			const input: LoginInputDTO = LoginUserSchema.parse(req.body);
			const user = await this.userBusiness.login(input);
			res.status(200).send(user);
		}catch (err){
			if(err instanceof ZodError){
				res.status(400).send(err.issues);
			}else if (err instanceof CustomError){
				res.status(err.statusCode).send(err.message);
			}else{
				res.status(500).send("Erro não tratato");
			}            
		}
	};

	public signup =  async (req: Request, res: Response) => { //Signup é o cadastro do usuario
		try{
			const input: CreateUserInputDTO = InsertUserSchema.parse(req.body);
			await this.userBusiness.signup(input);
			res.status(201).send("usuario criado com sucesso 🎆");
		}catch (err){
			if(err instanceof ZodError){
				res.status(400).send(err.issues);
			}else if (err instanceof CustomError){
				res.status(err.statusCode).send(err.message);
			}else{
				res.status(500).send("Erro não tratato");
			}
            
		}
	};

}