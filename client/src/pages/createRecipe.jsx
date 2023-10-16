import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const userID = useGetUserId();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instruction: "",
    cookingTime: 0,
    imageUrl: "",
    userOwner: userID,
  });
  const handleChange = (event) => {
    //pega o nome e valor do input
    const { name, value } = event.target;
    //basicamente seta exatamene como recipe é, mas o atributo name do key vai ser modificado pelo value pego no input
    setRecipe({ ...recipe, [name]: value }); // ou seja esta apenas mudando o valor a key especifica (name)
  };

  const handelIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
    console.log(recipe);
  };

  // eslint-disable-next-line no-unused-vars
  const addIngredient = () => {
    //pega tudo que ja estava no obj recipes e seta a key ingredients com spreed novamente e adiciona 1
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  //enviando dados do formulario para apoi
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5100/recipes", recipe);
      alert("Receita Cadastradas");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="full-page">
      <div className="create-recipe">
        <h2>Cadastrar Receita</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          ></input>

          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
          ></textarea>

          <label htmlFor="ingredients">Ingredientes</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handelIngredientChange(event, index)}
            ></input>
          ))}
          <br />
          <button type="button" onClick={addIngredient}>
            Adicionar Ingredientes
          </button>
          <br />

          <label htmlFor="instruction">Instructions</label>
          <textarea
            id="instruction"
            name="instruction"
            value={recipe.instruction}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="imageUrl">Imagem</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
          ></input>

          <label htmlFor="cookingTime">Tempo de Preparo (Minutos)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            onChange={handleChange}
          ></input>

          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
