import { USER_ROLES } from "../business/UserBusiness";
import { DataBase } from "./database";

export interface UserDB {
    id: string;
    name: string;
    email: string;
    password: string;
    role: USER_ROLES;
    created_at: string;
}

export class UserDataBase extends DataBase {
	public listAllUsers = async (): Promise<Array<UserDB>> => {
		const listaDeUsers: Array<UserDB> = await DataBase.connection.select("*").from("users");
		return listaDeUsers;
	};

	public findUserByName = async (name: string): Promise<Array<UserDB>> => {
		const listaDeUsers: Array<UserDB> = await DataBase.connection.select("*").from("users").where({name: name});
		return listaDeUsers;
	};

	public findUserById = async (id: string): Promise<UserDB> => {
		const [listaDeUsers]: Array<UserDB> = await DataBase.connection.select("*").from("users").where({id});
		return listaDeUsers;
	};

	public findUserbyEmail = async (email: string): Promise<Array<UserDB>> => {
		const listaDeUsers: Array<UserDB> = await DataBase.connection.select("*").from("users").where({email: email});
		return listaDeUsers;
	};

	public insertUser = async (data: UserDB): Promise<void> => {
		const { id, name, email, password, role, created_at } = data;
		await DataBase.connection.insert({
			id, name, email, password, role, created_at
		}).into("users");
	};

	public updateUser = async (data: UserDB): Promise<void> => {
		const { id, name, email, password, role } = data;
		await DataBase.connection("users").where({id: id}).update({
			name, email, password, role
		});
	};

	public deleteUser = async (data: UserDB): Promise<void> => {
		const { id } = data;
		await DataBase.connection("users").where({id: id}).delete();
	};
}