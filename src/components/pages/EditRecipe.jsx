import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleRecipe, updateRecipe, updateRecipeWithImage } from "../../services/recipeServices.js";
import { getAllMeasurementUnits } from "../../services/measurementService.js";

export const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: "",
    image: null,
    cooking_instructions: "",
    public: false,
    ingredients: [],
  });
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
      // when a promise is fulfilled the .then() is invoked with a callback function as its argument
      fetchSingleRecipe(id).then((data) => {
        
          //this declares a constant variable "lessonObj" that accesses the first element (index 0) of the "data" array
          setRecipe(data)
        });
    }, [id]);

    

  useEffect(() => {
    getAllMeasurementUnits().then(setMeasurementUnits);
  }, []);

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleNameChange = (e) => {
    setRecipe({ ...recipe, name: e.target.value });
  };

  const handleInstructionChange = (e) => {
    setRecipe({ ...recipe, cooking_instructions: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
};

  const addIngredient = () => {
    setRecipe({
        ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { ingredient: "", measurement_unit: "", quantity: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Flatten the ingredients array to ensure measurement_unit_id is a number
    const flattenedIngredients = recipe.ingredients.map((ingredient) => ({
      ingredient: ingredient.ingredient,
      quantity: ingredient.quantity,
      measurement_unit: ingredient.measurement_unit_id, // Keep this for frontend display purposes
    }));
  
    const editedRecipe = {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      cooking_instructions: recipe.cooking_instructions,
      ingredients: flattenedIngredients, // Directly use the array
    };
  
    console.log("Updating recipe with:", editedRecipe);
  
    await updateRecipeWithImage(editedRecipe, recipe.image).then(() => {
        navigate(`/myrecipes/${recipe.id}`);
    });
  };
  


  return (
    <div className="form-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Name:</label>
          <input
            className="input"
            type="text"
            value={recipe.name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="field">
          <label>Image:</label>
          <input
            className="input"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="ingredients-container">
          <h3>Ingredients:</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <div className="field">
                <label>Ingredient:</label>
                <input
                  className="input"
                  type="text"
                  value={ingredient.ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredient", e.target.value)
                  }
                  required
                />
              </div>
              <div className="field">
                <label>Quantity:</label>
                <input
                  className="input"
                  type="number"
                  step="0.01"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  required
                />
              </div>
              <div className="field">
                <label>Measurement Unit:</label>
                <div className="select">
                  <select
                    className="input"
                    value={ingredient.measurement_unit_id}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "measurement_unit_id",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="" disabled>Select Measurement Unit</option>
                    {measurementUnits.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                className="button is-danger"
                onClick={() => removeIngredient(index)}
              >
                Remove Ingredient
              </button>
            </div>
          ))}
          <button
            type="button"
            className="button add-button"
            onClick={addIngredient}
          >
            Add Another Ingredient
          </button>
        </div>
        <div className="field cooking_instructions">
          <label>Cooking Instructions:</label>
          <textarea
            className="textarea"
            value={recipe.cooking_instructions}
            onChange={handleInstructionChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="button is-primary">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};
