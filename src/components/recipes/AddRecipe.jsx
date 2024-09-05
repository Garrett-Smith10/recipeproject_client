import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMeasurementUnits } from "../../services/measurementService.js";
import { createRecipe } from "../../services/recipeServices.js";
import './AddRecipe.css'

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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Image:</label>
              <div className="control">
                <input
                  className="input"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ingredients-container">
          <h3 className="title is-4">Ingredients:</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <div className="field">
                <label className="label">Ingredient:</label>
                <div className="control">
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
              </div>
              <div className="field">
                <label className="label">Quantity:</label>
                <div className="control">
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
              </div>
              <div className="field">
                <label className="label">Measurement Unit:</label>
                <div className="control">
                  <div className="select">
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
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => removeIngredient(index)}
              >
                Remove Ingredient
              </button>
            </div>
          ))}
          <button
            type="button"
            className="button green-button"
            onClick={addIngredient}
          >
            Add Another Ingredient
          </button>
        </div>

        <div className="cooking_instructions">
          <label className="label">Cooking Instructions:</label>
          <div className="control">
            <textarea
              className="textarea"
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="button is-link">Add Recipe</button>
      </form>
    </div>
  );
};
