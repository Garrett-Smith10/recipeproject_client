import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteRecipe, fetchSingleRecipe } from "../../services/recipeServices"; // Assume this function exists

export const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleRecipe(id).then((data) => {
      setRecipe(data);
    });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id); 
        console.log(`Recipe ${id} deleted successfully`);
        navigate('/myrecipes'); 
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  return (
    <div>
      <h2>{recipe.name}</h2>
      <img
        src={recipe.image}
        alt={recipe.name}
        style={{ width: "30%", height: "auto" }}
      />
      <ul>
        <h3>
          <strong>Ingredients:</strong>
        </h3>
        {recipe?.ingredients?.map((ingredient, index) => (
          <li key={index}>
            {ingredient.ingredient}, {ingredient.quantity}{" "}
            {ingredient.measurement_unit}
          </li>
        ))}
        <p>
          <strong>Cooking Instructions:</strong>
        </p>
        <p>{recipe.cooking_instructions}</p>
      </ul>
        <button onClick={handleDelete}>Delete Recipe</button>
      <Link to={`/edit-recipe/${id}`}>
        <button>Edit Recipe</button>
      </Link>
    </div>
  );
};
