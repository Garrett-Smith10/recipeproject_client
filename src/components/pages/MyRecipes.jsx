import { useState, useEffect } from "react";
import { fetchRecipes } from "../../services/recipeServices.js";
import { useNavigate } from "react-router-dom";

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(setRecipes);
  }, [setRecipes]);

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
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{ width: "200px", height: "auto" }}
            />
            <button
              onClick={() => handleViewRecipe(recipe.id)}
              style={{
                backgroundColor: "#007bff", // Primary color
                color: "white", // Text color
                padding: "10px 20px", // Padding around text
                borderRadius: "5px", // Rounded corners
                border: "none", // Remove default button styling
                cursor: "pointer", // Change cursor to pointer on hover
                fontSize: "16px", // Font size
                margin: "5px", // Margin around the button
                fontWeight: "bold", // Bold font weight
                ":hover": {
                  backgroundColor: "#0056b3", // Darker shade on hover
                },
              }}
            >
              View Recipe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
