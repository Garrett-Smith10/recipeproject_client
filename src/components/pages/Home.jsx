import { useState, useEffect } from 'react';
import { publicRecipes } from '../../services/recipeServices.js';
import './Home.css'

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
      <div className="home-container">
            <h1 className="title is-1 has-text-centered">Welcome to Strudel!</h1>
            <ul className="recipe-list">
                {recipes.map(recipe => (
                    <li key={recipe.id} className="recipe-card box">
                        <div className="columns">
                            <div className="column is-one-third">
                                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                            </div>
                            <div className="column">
                                <h2 className="title is-4">{recipe.name}</h2>
                                <p><strong>Ingredients:</strong></p>
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient.ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
