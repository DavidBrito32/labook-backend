import express, { Request, Response } from "express";
import cors from "cors";

const App = express();
const port = 3003;
App.use(express.json());
App.use(cors());

App.get("/", (req: Request, res: Response) => {
    try{
        res.status(200).send("Olá, seja bem vindo a API restfull Labook sua nova rede social");
    }catch (err) {
        if(res.statusCode === 200){
            res.statusCode = 400;
        }
        if(err instanceof Error){
            res.send(err.message);
        }else{
            res.send("erro inesperado, contate o suporte");
        }
    }
});







App.listen(port, () => {
    console.log(`servidor de pé no link: httop://localhost:${port}/`);
});