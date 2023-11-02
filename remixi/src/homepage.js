import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteRating from './DeleteRating'; // Component for deleting a rating
import UserContext from './UserContext'; // Context to access the user information
import UpdateRating from './UpdateRating'; // Component for updating a rating
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit } from "@fortawesome/free-solid-svg-icons"; // Icons for UI actions

function HomePage() {
  const [ratings, setRatings] = useState([]); // State to hold the ratings data
  const { username } = useContext(UserContext); // Username from the global context

  // useCallback is used to memoize the fetchRatings function so it's not recreated on every render
  const fetchRatings = useCallback(async () => {
    try {
      // GET request to fetch ratings from the backend, limited to 100 items
      const response = await axios.get('http://localhost/comp333_hw3/backend/index.php/ratings/list?limit=100');
      console.log("Backend response:", response.data);
      // Check if the response data is an array (as expected)
      if (Array.isArray(response.data)) {
        setRatings(response.data); // Update state with fetched ratings
      } else {
        console.error("Received non-array data from backend:", response.data);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, []); // Dependencies are empty, meaning this will only be created once

  useEffect(() => {
    fetchRatings(); // Fetch ratings when the component is mounted
  }, [fetchRatings]); // Depend on the memoized function

  // Function to refresh the ratings list after a successful delete
  const handleDeleteSuccess = useCallback(() => {
    fetchRatings(); // Re-fetch the ratings
  }, [fetchRatings]);

  // Function to render star icons based on the rating value
  function renderRatingStars(rating) {
    const starIcons = [];
    for (let i = 1; i <= rating; i++) {
      starIcons.push(
        <FontAwesomeIcon
          key={i} // Unique key for each star icon
          icon={faStar} // Star icon for ratings
          style={{color: "#7ec0dd",}} 
        />
      );
    }
    return starIcons;
  }

  // JSX for rendering the homepage
  return (
    <div>
      <h2>Home Page</h2>
      {username && <p>Welcome, {username}!</p>} // Greet the logged-in user
      <p><Link to="/add-rating">Add Rating</Link></p> // Link to add a new rating
      <p><Link to="/search">Search</Link></p> // Link to the search page
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Artist</th>
          <th>Song</th>
          <th>Rating</th>
          // Table headers
        </tr>
      </thead>
      <tbody>
        {Array.isArray(ratings) && ratings.map((rating) => (
          // Map through each rating to create table rows
          <tr key={rating.id}>
            <td>{rating.id}</td>
            <td>{rating.artist}</td>
            <td>{rating.song}</td>
            <td>{renderRatingStars(rating.rating)}</td> // Display star icons for rating
            <td><Link to={`/view-rating/${rating.id}`}>View</Link></td> // Link to view rating details
            {rating.username === username && ( // Only show update/delete if rating belongs to user
              <td>
                <Link to={`/update-rating/${rating.id}`}>Update</Link>
                <DeleteRating ratingId={rating.id} onDeleteSuccess={handleDeleteSuccess} /> // Delete button
                <Link to={`/update-rating/${rating.id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{color: "#7ec0dd",}}/> // Edit icon
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default HomePage;