import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//endpoint registro
router.post("/register", async (req, res) => {
  //request(solicitação) obter dados de quem fez a solicitacao de API para esse endpoint
  //response(resposta) é usado para enviar dados de volta para quem fez o request

  //Username e password sao resgatados do frontend
  const { userName, password } = req.body; // frontend precisa enviar um obj contendo username e password

  //procura o username no banco de dados atravez do userModel
  const user = await userModel.findOne({
    username: userName,
  });

  if (user) {
    //se user for true existe um username no banco de dados
    return res.json({ message: "User Already Exists!" });
  }

  //criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  //cria novo usuario com senha criptografada
  const newUser = new userModel({
    username: userName,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "User Registered!" });
});

router.post("/login", async (req, res) => {
  //Username e password sao resgatados do frontend
  const { username, password } = req.body;

  //procura o username no banco de dados atravez do userModel
  const user = await userModel.findOne({ username });

  //se usuario nao existir, a variavel acima for falsa entao usuario n existe no bd
  if (!user) {
    return res.json({ message: "User dont exists" });
  }

  //compara o password que veio do req.body com a senha que foi resgatada do bd atraveez da variavel user
  const isPasswordValid = await bcrypt.compare(password, user.password);

  //se a senha comparada n for igual, senha incorretaa
  if (!isPasswordValid) {
    return res.json({ message: "User name or password is incorrect!" });
  }

  //cria token, foi atribuido ao token foi o id de usuario, o o segredo do token que esta na variavel de ambiente
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //esse JWTSECRET vai servir pra ver se o usuario esta autenticado

  //retorna o token o userID
  res.json({ token: token, userID: user._id });
});

export { router as userRouter };
