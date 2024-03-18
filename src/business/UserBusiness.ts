import { UserDB, UserDataBase } from "../database/userDatabase";
import { CreateUserInputDTO, LoginInputDTO, LoginOutputDTO } from "../dto/users";
import { BadRequest } from "../errors/BadRequest";
import { ForbiddenError } from "../errors/ForbiddenError";
import { Users } from "../models/User";
import { HashManager } from "../services/hashManager";
import { TokenManager, TokenPayload } from "../services/token";
import { IdGenerator } from "../services/uuid";

export enum USER_ROLES {
	NORMAL = "NORMAL",
	ADMIN = "ADMIN",
}
export class UserBusiness {
	constructor(
        protected userDataBase: UserDataBase,
		protected idGenerator: IdGenerator,
		protected tokenManager: TokenManager,
		protected hashManager: HashManager
	){}
	public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
		const { email, password } = input;
		const [exists]: Array<UserDB> = await this.userDataBase.findUserbyEmail(email);

		if(!exists){
			throw new ForbiddenError("Informações invalidas");
		}
		const passwordIsCorrect: boolean = await this.hashManager.compare(password, exists.password);
		if(!passwordIsCorrect){
			throw new BadRequest("'email' ou 'password' invalidos");
		}
		const usuario = new Users(exists.id,exists.name,exists.email,exists.password,exists.role,exists.created_at);
		const tokenPayload: TokenPayload = usuario.getPayload();
		const token = this.tokenManager.createToken(tokenPayload);
		const output: LoginOutputDTO = {
			message: "login realizado com sucesso",
			token
		};		
		return output;
	};

	public signup = async (input: CreateUserInputDTO): Promise<void> => {
		const { name, email, password } = input;
		const [isEmailAllReadyExists]: Array<UserDB> = await this.userDataBase.findUserbyEmail(email);
		if(isEmailAllReadyExists){
			throw new BadRequest("'email' - Informe outro email");
		}

		if(!password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$)")){
			throw new BadRequest("'password' - A senha deve conter no minimo 8 caracteres e conter uma letra maiuscula e um caractere especial");
		}

		const passwordHash: string = await this.hashManager.hash(password);

		const ID = this.idGenerator.generate();
		const currentDate = new Date().toISOString();
		const usuario: UserDB = {
			id: ID,
			name,
			email,
			password: passwordHash,
			role: USER_ROLES.NORMAL,
			created_at: currentDate
		};
		await this.userDataBase.insertUser(usuario);
	};
}