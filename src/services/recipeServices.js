export const fetchRecipes = () => {
  return fetch("http://localhost:8000/recipes", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}

export const fetchSingleRecipe = (id) => {
  return fetch(`http://localhost:8000/recipes/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}



export const createRecipe = async (postData) => {
  const formData = new FormData();
  Object.keys(postData).forEach((key) => formData.append(key, postData[key]));

  const response = await fetch("http://localhost:8000/recipes", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: formData,
  });
  // Parse the JSON response
  return await response.json();

}

export const deleteRecipe = async (id) => {
  try {
    await fetch(`http://localhost:8000/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
    }).then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      console.log(`Recipe ${id} deleted successfully`);
      // Optionally, refresh the page or navigate away after successful deletion
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};

export const updateRecipe = (updatedRecipe) => {
  return fetch(`http://localhost:8000/recipes/${updatedRecipe.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRecipe),
  }).then(res => res.json());
};

export const uploadImage = (imageFile, recipeId) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return fetch(`http://localhost:8000/recipes/${recipeId}/upload-image/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem('auth_token')}`,
    },
    body: formData,
  }).then(res => res.json());
};

export const updateRecipeWithImage = (updatedRecipe, imageFile) => {
  // First, update the recipe details excluding the image
  return updateRecipe(updatedRecipe).then(() => {
    // Then, upload the image
    return uploadImage(imageFile, updatedRecipe.id);
  }).then(() => {
    // Optionally, refresh the recipe details after successful upload
    return fetch(`http://localhost:8000/recipes/${updatedRecipe.id}`).then(res => res.json());
  });
};