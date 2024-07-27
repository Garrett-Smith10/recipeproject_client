import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleRecipe } from "../../services/recipeServices"; // Assume this function exists

export const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    
 
  
  
  useEffect(() => {
    fetchSingleRecipe(setRecipe, id).then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>; // Or any loading indicator
  }
  
  return (
    <div>
    <h2>{recipe.name}</h2>
    <img src={recipe.image} alt={recipe.name} style={{ width: '30%', height: 'auto'}} />
    <ul>
        <h3><strong>Ingredients:</strong></h3>
      {recipe?.ingredients?.map((ingredient, index) => (
          <li key={index}>
          {ingredient.ingredient}, {ingredient.quantity} {ingredient.measurement_unit}
        </li>
      ))}
      <p><strong>Cooking Instructions:</strong></p>
      <p>{recipe.cooking_instructions}</p>
    </ul>
  </div>
  );
};

