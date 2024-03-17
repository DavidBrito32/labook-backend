import { USER_ROLES } from "../business/UserBusiness";
import { TokenPayload } from "../services/token";

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export class Users {
	constructor(
    protected id: string,
    protected name: string,
    protected email: string,
    protected password: string,
    protected role: USER_ROLES,
    protected createdAt: string
	) {}
	public getid(): string {
		return this.id;
	}

	public setId(id: string) {
		this.id = id;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string) {
		this.name = name;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(email: string) {
		this.email = email;
	}

	public getPassword(): string {
		return this.password;
	}

	public setPassword(password: string) {
		this.password = password;
	}

	public getRole(): USER_ROLES {
		return this.role;
	}

	public setRole(role: USER_ROLES) {
		this.role = role;
	}

	public getCreatedAt(): string {
		return this.createdAt;
	}

	public setCreatedAt(createdAt: string) {
		this.createdAt = createdAt;
	}

	public getPayload(): TokenPayload {
		return {
			id: this.id,
			name: this.name,
			role: this.role,
		};
	}
}
