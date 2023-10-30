import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

export const Home = () => {
  // Acompanha todas as receitas que existem no bd
  const [recipes, setRecipes] = useState([]);

  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();

  // Obter as receitas
  useEffect(() => {
    // useEffect é chamado toda vez que o componente for renderizado
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5100/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/recipes/savedRecipes/ids/${userID}`
        );
        console.log(response.data);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    // Chame a função fetchRecipes aqui para buscar as receitas quando o componente for montado
    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]); // O segundo argumento vazio [] indica que este efeito deve ser executado apenas uma vez após a montagem inicial do componente

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:5100/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home">
      <h1>Receitas</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Descrição: {recipe.description}</p> {/* Corrigido aqui */}
            </div>
            <div className="instruction">
              <p>Instruções: {recipe.instruction}</p>
            </div>
            <p>Tempo de Preparo: {recipe.cookingTime} (Minutos)</p>
            <button
              className="center-button"
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
            >
              Salvar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
