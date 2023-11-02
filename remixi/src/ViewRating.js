import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Hook to access the URL parameters
import { useNavigate } from 'react-router-dom'; // Hook to navigate programmatically between routes

function ViewRating() {
  const [rating, setRating] = useState(null); // State to hold rating data
  const { id } = useParams(); // Extract the rating ID from the URL
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Function to navigate back to the homepage
  const handleBack = () => {
    navigate('/homepage');
  };

  // Effect hook to fetch rating data when component mounts or ID changes
  useEffect(() => {
    const fetchRating = async () => {
        try {
            console.log("Fetching rating for ID:", id); // Log for debugging
            // Perform GET request to fetch rating data
            const response = await axios.get(`http://localhost/comp333_hw3/backend/index.php/ratings/view?id=${id}`);
            console.log("Response data:", response.data); // Log for debugging
            // If response data contains a valid ID, update the state
            if (response.data && response.data.id) {
                setRating(response.data);
            } else {
                console.error("Received unexpected data from backend:", response.data); // Log unexpected data format
            }
        } catch (error) {
            console.error("Error fetching rating:", error); // Log any error encountered during fetch
        }
    };

    fetchRating();
}, [id]); // Effect runs when 'id' changes

  // Render the rating details or a loading state
  return (
    <div>
      <h2>Rating Details</h2>
      {rating ? (
        // Display rating details if rating data is loaded
        <>
          <p><strong>ID:</strong> {rating.id}</p>
          <p><strong>Artist:</strong> {rating.artist}</p>
          <p><strong>Song:</strong> {rating.song}</p>
          <p><strong>Rating:</strong> {rating.rating}</p>
        </>
      ) : (
        // Display a loading message if rating data is not yet loaded
        <p>Loading rating details...</p>
      )}
      {/* Button to navigate back to the homepage */}
      <p><button type="button" onClick={handleBack}>Back to Home</button></p>
    </div>
  );
}

export default ViewRating;