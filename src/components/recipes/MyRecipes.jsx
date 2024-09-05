import { useState, useEffect } from "react";
import { fetchRecipes, toggleRecipeVisibility } from "../../services/recipeServices.js";
import { useNavigate } from "react-router-dom";
import './MyRecipes.css';

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
      <h2 className="title is-3 has-text-centered">My Recipes</h2>
      <div className="columns is-multiline">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="column is-one-third">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={recipe.image} alt={recipe.name} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{recipe.name}</p>
                  </div>
                </div>
                <div className="content">
                  <button 
                    onClick={() => handleViewRecipe(recipe.id)} 
                    className="button is-link is-fullwidth"
                  >
                    View Recipe
                  </button>
                  <label className="checkbox">
                    <input 
                      type="checkbox" 
                      checked={recipe.public} 
                      onChange={(e) => handleToggleVisibility(recipe.id, e.target.checked)}
                    />
                    Public
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
