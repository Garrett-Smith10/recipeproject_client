export const fetchRecipes = async (setRecipes) => {
  fetch("http://localhost:8000/recipes", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const data = await response.json();
    setRecipes(data);
  });
};

export const fetchSingleRecipe = async (setRecipe, id) => {
  fetch(`http://localhost:8000/recipes/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const data = await response.json();
    setRecipe(data);
  });
};


export async function createRecipe(postData) {
  const token = localStorage.getItem("auth_token");

  const formData = new FormData();
  Object.keys(postData).forEach((key) => formData.append(key, postData[key]));

  const response = await fetch("http://localhost:8000/recipes", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });
  return await response.json();
}


