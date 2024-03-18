import express from "express";
import { PostController } from "../controllers/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDataBase } from "../database/postDataBase";
import { IdGenerator } from "../services/uuid";
import { TokenManager } from "../services/token";

export const Posts = express.Router();
const post = new PostController(new PostBusiness(new PostDataBase(), new IdGenerator(), new TokenManager()));

Posts.get("/", post.getAllPosts);
Posts.post("/", post.createPosts);
Posts.put("/:id", post.editPost);
Posts.delete("/:id", post.deletePost);

Posts.post("/:id/like", post.likePost);