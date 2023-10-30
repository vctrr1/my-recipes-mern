import { RecipeModel } from "../models/recipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //a collection RecipeModel com um obj vazio sicnifica que pode encontar com base em campos especifico,
    //podendo colocar no obj as condições para encontar, mas como quero encontrar todos os documentos na collection, o obj vai vazio
    const response = await RecipeModel.find({}); //entao no json da requisicao do fron é vazio
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
//permine salvar uma receita
router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    //adiciona ao final das receitas salvas do usuario especifico a nova receita
    user.savedRecipes.push(recipe);
    await user.save(); //salva as mudanças na coleção
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
//pega os IDs das receitas salvas do usuario pegando o ID do usuario logado
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export { router as RecipesRouter };
