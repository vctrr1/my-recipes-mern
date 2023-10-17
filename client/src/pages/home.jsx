import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

export const Home = () => {
  // Acompanha todas as receitas que existem no bd
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserId();
  // Obter as receitas
  useEffect(() => {
    // useEffect é chamado toda vez que o componente for renderizado
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5100/recipes");
        setRecipes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    // Chame a função fetchRecipes aqui para buscar as receitas quando o componente for montado
    fetchRecipes();
  }, []); // O segundo argumento vazio [] indica que este efeito deve ser executado apenas uma vez após a montagem inicial do componente

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:5100/recipes", {
        recipeID,
        userID,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Receitas</h2>
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
            <button onClick={() => saveRecipe(recipe._id)}>Salvar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
