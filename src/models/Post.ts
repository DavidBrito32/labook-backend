import { PostOutputDTO } from "../dto/posts";

export interface PostModel {
	id: string;
	creatorId: string;
	content: string;
	like: number;
	dislikes: number;
	createdAt: string;
}

export class Post {
	private id: string;
	private creatorId: string;
	private content: string;
	private like: number;
	private dislikes: number;
	private createdAt: string;
	private updatedAt: string;
	private creatorName: string;
	constructor(
		id: string,
		creatorId: string,
		content: string,
		like: number,
		dislikes: number,
		createdAt: string,
		updatedAt: string,
		creatorName: string,
	) {
		this.id = id;
		this.creatorId = creatorId;
		this.content = content;
		this.like = like;
		this.dislikes = dislikes;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.creatorName = creatorName;
	}

	public getId = (): string => {
		return this.id;
	};

	public setId = (id: string): void => {
		this.id = id;
	};

	public getCreatorId = (): string => {
		return this.creatorId;
	};

	public setCreatorId = (id: string): void => {
		this.creatorId = id;
	};

	public getContent = (): string => {
		return this.content;
	};

	public setContent = (content: string): void => {
		this.content = content;
	};

	public getLike = (): number => {
		return this.like;
	};

	public setLike = (like: number): void => {
		this.like = like;
	};

	public getDislike = (): number => {
		return this.dislikes;
	};

	public setDislike = (dislike: number): void => {
		this.dislikes = dislike;
	};

	public getCreatedAt = (): string => {
		return this.createdAt;
	};

	public setCreatedAt = (createdAt: string): void => {
		this.createdAt = createdAt;
	};

	public getUpdatedAt(): string {
		return this.updatedAt;
	}

	public setUpdatedAt (updatedAt: string): void {
		this.updatedAt = updatedAt;
	}

	public getCreatorName = (): string => {
		return this.creatorName;
	};

	public setCreatorName = (name: string): void => {
		this.creatorName = name;
	};
	
	public getModel = (): PostOutputDTO => {
		return {
			id: this.id,
			content: this.content,
			likes: this.like,
			dislikes: this.dislikes,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			creator: {
				id: this.creatorId,
				name: this.creatorName
			}
		};
	};
}
