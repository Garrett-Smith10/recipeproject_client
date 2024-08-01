import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroceryListItems } from '../../services/groceryServices'; // Assume this service function exists
import './GroceryListDetails.css'; // Import the CSS file

export const GroceryListDetails = () => {
  const { id } = useParams(); // Get the grocery list ID from the URL parameters
  const [groceryListDetails, setGroceryListDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGroceryListItems(id); // Fetch the grocery list details
        setGroceryListDetails(data);
      } catch (error) {
        console.error("Failed to fetch grocery list details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!groceryListDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="details-container box">
      <h2 className="title is-3 has-text-centered">{groceryListDetails.name}</h2>
      <ul className="list is-hoverable">
        {groceryListDetails.items.map((item) => (
          <li key={item.id} className="list-item">
            {item.ingredient}: {item.quantity} {item.measurement_unit}
          </li>
        ))}
      </ul>
    </div>
  );
};


