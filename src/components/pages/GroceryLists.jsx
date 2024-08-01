import { useState, useEffect } from "react";
import { fetchGroceryLists } from "../../services/groceryServices";
import { useNavigate } from "react-router-dom";
import "./GroceryLists.css"; // Import the CSS file
import { deleteGroceryList } from "../../services/groceryServices.js";

export const GroceryList = () => {
  const [groceryLists, setGroceryLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroceryLists()
      .then((data) => {
        console.log("Fetched grocery lists:", data);
        setGroceryLists(data);
      })
      .catch((error) => {
        console.error("Failed to fetch grocery lists:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this grocery list?")) {
      await deleteGroceryList(id); // Attempt to delete the grocery list
      fetchGroceryLists().then((data) => {
        // Re-fetch the grocery lists
        console.log("Fetched grocery lists:", data);
        setGroceryLists(data); // Update the state with the new data
      });
    }
  };

  return (
    <div className="container">
      <h2 className="title is-3 has-text-centered mb-5">Grocery Lists</h2>
      <button
        className="button is-primary mb-5"
        onClick={() => navigate("/recipelist")}
      >
        Create Grocery List
      </button>
      <div className="columns is-multiline">
        {groceryLists.length > 0 ? (
          groceryLists.map((list) => (
            <div key={list.id} className="column is-one-quarter">
              <div className="card fixed-card-size">
                <div className="card-content">
                  <h3 className="title is-4">{list.name}</h3>
                </div>
                <div className="card-footer">
                  <button
                    className="button is-info card-footer-item"
                    onClick={() => navigate(`/viewgrocerylist/${list.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="button is-danger card-footer-item"
                    onClick={() => handleDelete(list.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No grocery lists available.</p>
        )}
      </div>
    </div>
  );
};
