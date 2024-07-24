import { useState, useEffect } from "react";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8000/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error("Failed to fetch recipes");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
