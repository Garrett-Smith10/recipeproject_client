import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../../services/recipeServices.js';
import { createGroceryList } from '../../services/groceryServices.js';
import './CreateGroceryList.css'; // Import the CSS file

export const CreateGroceryList = ({ onSubmit }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchRecipes().then(setRecipes);
  }, []);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRecipes([...selectedRecipes, value]);
    } else {
      setSelectedRecipes(selectedRecipes.filter(recipeId => recipeId !== value));
    }
  };


  const handleNameChange = (event) => {
    setName(event.target.value); // Update the name state with the user's input
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = { name, selectedRecipes }; // Assuming selectedRecipes is the array of selected items
  
    createGroceryList(dataToSend).then(() => {
      // Check if onSubmit is defined and is a function before calling it
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit(dataToSend); // Pass the dataToSend to onSubmit
      }
      navigate('/grocerylist'); // Navigate to the grocery lists page after submission
    }).catch(error => {
      console.error("Failed to create recipe:", error);
      // Optionally, handle the error, e.g., show an error message to the user
    });
  };

  return (
    <form onSubmit={handleSubmit} className="box form-container">
      <h2 className="title is-3 has-text-centered">Create Grocery List</h2>

      <div className="field has-text-centered">
        <label className="label" htmlFor="name">Grocery List Name:</label>
        <div className="control is-centered">
          <input
            className="input is-small"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            style={{ width: '50%' }}
          />
        </div>
      </div>

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
                <div className="content has-text-centered">
                  <h3 className="title is-5">{recipe.name}</h3>
                  <div className="field">
                    <input
                      className="is-checkradio"
                      type="checkbox"
                      id={`recipe-${recipe.id}`}
                      name={`recipe-${recipe.id}`}
                      value={recipe.id}
                      onChange={handleChange}
                    />
                    <label htmlFor={`recipe-${recipe.id}`} className="checkbox">Select</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="field is-grouped has-text-centered">
        <div className="control">
          <button type="submit" className="button is-primary">Submit</button>
        </div>
        <div className="control">
          <button type="reset" className="button is-light">Reset</button>
        </div>
      </div>
    </form>
  );
};
