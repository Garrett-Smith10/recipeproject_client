import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMeasurementUnits } from "../../services/measurementService.js";

export const RecipeForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", measurement_unit: "", quantity: "" },
  ]);
  const [measurementUnits, setMeasurementUnits] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token'); // Retrieve token from local storage

    if (token) {
      getAllMeasurementUnits(token).then(setMeasurementUnits);
    }
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
    const token = localStorage.getItem("auth_token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("cooking_instructions", cookingInstructions);
    formData.append("public", false); // Set public to false by default

    // Append each ingredient as a JSON string
    formData.append("ingredients", JSON.stringify(ingredients));

    try {
        const response = await fetch("http://localhost:8000/recipes/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          onSubmit(result); // Trigger any callback to handle post-submit actions
          navigate("/myrecipes"); // Navigate to MyRecipes
        } else {
          console.error("Failed to submit recipe");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

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
