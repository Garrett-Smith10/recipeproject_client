import { useState, useEffect } from "react";
import { fetchRecipes, toggleRecipeVisibility } from "../../services/recipeServices.js";
import { useNavigate } from "react-router-dom";
import './MyRecipes.css'

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes().then((data) => {
      console.log("Fetched recipes with public status:", data)
      setRecipes(data);
    }).catch(error => {
      console.error("Failed to fetch recipes:", error);
      // Handle errors appropriately, maybe show a message to the user
    });
  }, []); 

  const handleToggleVisibility = async (id, isChecked) => {
    try {
      await toggleRecipeVisibility(id, isChecked);
      // Optionally, refresh the list of recipes after toggling visibility
      fetchRecipes().then(setRecipes);
    } catch (error) {
      console.error("Error toggling recipe visibility:", error);
    }
  };

  const handleViewRecipe = (id) => {
    navigate(`/myrecipes/${id}`);
  };

  return (
    <div className="recipes-container">
    <h2>My Recipes</h2>
    <ul className="recipes-list">
      {recipes.map((recipe) => (
        <li key={recipe.id} className="recipe-item">
          <div className="recipe-content">
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} />
          </div>
          <button onClick={() => handleViewRecipe(recipe.id)} className="view-recipe-button">
            View Recipe
          </button>
          {/* Checkbox to toggle visibility */}
          <label>
            <input 
              type="checkbox" 
              checked={recipe.public} 
              onChange={(e) => handleToggleVisibility(recipe.id, e.target.checked)}
            />
            Public
          </label>
        </li>
      ))}
    </ul>
  </div>
  );
};
