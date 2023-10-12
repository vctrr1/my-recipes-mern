import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  //request(solicitação) obter dados de quem fez a solicitacao de API para esse endpoint
  //response(resposta) é usado para enviar dados de volta para quem fez o request

  //Username e password sao resgatados do frontend
  const { username, password } = req.body; // frontend precisa enviar um obj contendo username e password

  //procura o username no banco de dados atravez do userModel
  const user = await userModel.findOne({
    username: username,
  });

  if (user) {
    //se user for true existe um username no banco de dados
    return res.json({ message: "User Already Exists!" });
  }

  //criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  //cria novo usuario com senha criptografada
  const newUser = new userModel({
    username: username,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "User Registered!" });
});

router.post("/login");

export { router as userRouter };
