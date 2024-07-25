import { useState, useEffect } from "react";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!token) {
        console.error("No auth token found");
        return;
      }

      console.log("Auth token:", token); // Log the token

      try {
        const response = await fetch("http://localhost:8000/recipes", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRecipes();
  }, [token]); // Add token as a dependency

   return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} style={{ width: "200px", height: "auto" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
