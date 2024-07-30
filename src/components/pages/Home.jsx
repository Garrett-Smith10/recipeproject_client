import { useState, useEffect } from 'react';
import { publicRecipes } from '../../services/recipeServices.js';

export const Home = () => {
    // State to store the recipes
    const [recipes, setRecipes] = useState([]);

    // Fetch public recipes when the component mounts
    useEffect(() => {
      publicRecipes().then((data) => {
        setRecipes(data);
      }).catch(error => {
        console.error("Failed to fetch recipes:", error);
        // Handle errors appropriately, maybe show a message to the user
      });
    }, []); 

    return (
        <div>
            {/* Display "Strudel" with a cool font */}
            <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '48px', textAlign: 'center', marginBottom: '20px' }}>Strudel</h1>

            {/* Render the list of public recipes */}
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <img src={recipe.image} alt={recipe.name} style={{ width: '200px', height: 'auto' }} />
                        <p>{recipe.cooking_instructions.substring(0, 100)}...</p>
                        {/* Additional attributes */}
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            {recipe.ingredients.map(ingredient => (
                                <li key={ingredient.ingredient}>{ingredient.ingredient}: {ingredient.quantity} {ingredient.measurement_unit}</li>
                            ))}
                        </ul>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
