import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMeasurementUnits } from "../../services/measurementService.js";
import { createRecipe } from "../../services/recipeServices.js";

export const RecipeForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", measurement_unit: "", quantity: "" },
  ]);
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
      getAllMeasurementUnits().then(setMeasurementUnits);
  }, []); 

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredient: "", measurement_unit: "", quantity: "" },
    ]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const postData = {
      name,
      image,
      cooking_instructions: cookingInstructions,
      public: false,
      ingredients: JSON.stringify(ingredients),
    };
  
    createRecipe(postData).then(() => {
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit();
      }
      navigate("/myrecipes");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <div>
        <h3>Ingredients:</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>
              Ingredient:
              <input
                type="text"
                value={ingredient.ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredient", e.target.value)
                }
                required
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                step="0.01"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                required
              />
            </label>
            <label>
              <select
                value={ingredient.measurement_unit}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "measurement_unit",
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
            </label>
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove Ingredient
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Another Ingredient
        </button>
      </div>
      <label>
        Cooking Instructions:
        <textarea
          value={cookingInstructions}
          onChange={(e) => setCookingInstructions(e.target.value)}
          required
        />
      </label>
      <div>
      <button type="submit">Add Recipe</button>
      </div>
    </form>
  );
};
