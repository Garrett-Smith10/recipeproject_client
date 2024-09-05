export const fetchGroceryLists = () => {
    return fetch("http://localhost:8000/grocery_lists", {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  

  export const fetchGroceryListItems = (listId) => {
    return fetch(`http://localhost:8000/grocery_lists/${listId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  export const createGroceryList = async (postData) => {
    const response = await fetch("http://localhost:8000/grocery_lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify content type
        Authorization: `Token ${localStorage.getItem("auth_token")}`, // Keep the authorization header
      },
      body: JSON.stringify(postData), // Convert postData to JSON string
    });

    // Parse the JSON response
    return await response.json();
};

  export const addGroceryItem = async (listId, itemName, quantity, measurementUnitId) => {
    const itemData = {
      ingredient_name: itemName,
      quantity: quantity,
      measurement_unit: measurementUnitId,
    };
  
    const response = await fetch(`http://localhost:8000/api/grocery_lists/${listId}/add-item`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    console.log(`Item added successfully`);
    return await response.json();
}

export const deleteGroceryList = async (id) => {
    try {
      await fetch(`http://localhost:8000/grocery_lists/${id}`, {
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