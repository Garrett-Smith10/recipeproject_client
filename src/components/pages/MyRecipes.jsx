import { useState, useEffect } from "react";
import { fetchRecipes } from "../../services/recipeServices.js";

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchRecipes(setRecipes, token);
  }, [token, setRecipes]);

   return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} style={{ width: "200px", height: "auto" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

