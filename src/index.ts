import express from "express";
import cors from "cors";
import { User } from "./routes/UserRouter";
import { Posts } from "./routes/Posts";

const App = express();
const port = 3003;
App.use(express.json());
App.use(cors());

App.use("/users", User);
App.use("/posts", Posts);

App.listen(port, () => {
	console.log(`servidor de pé no link: httop://localhost:${port}/`);
});
