import express from "express";
import { UserContoller } from "../controllers/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../database/userDatabase";
import { IdGenerator } from "../services/uuid";
import { TokenManager } from "../services/token";
import { HashManager } from "../services/hashManager";
export const User = express.Router();
const userControler = new UserContoller(new UserBusiness(new UserDataBase(), new IdGenerator(), new TokenManager(), new HashManager()));

User.post("/login", userControler.login);

User.post("/signup", userControler.signup); 