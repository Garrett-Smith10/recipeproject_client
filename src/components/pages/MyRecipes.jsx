import { useState, useEffect } from "react";
import { fetchRecipes } from "../../services/recipeServices.js";
import { useNavigate } from "react-router-dom";

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate

  useEffect(() => {
    fetchRecipes(setRecipes, token);
  }, [token, setRecipes]);

  const handleViewRecipe = (id) => {
    navigate(`/myrecipes/${id}`);
  };

   return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} style={{ width: "200px", height: "auto" }} />
            <button onClick={() => handleViewRecipe(recipe.id)}>View Recipe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

