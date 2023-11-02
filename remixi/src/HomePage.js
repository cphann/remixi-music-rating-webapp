import React, { useState, useEffect, useContext, useCallback   } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteRating from './DeleteRating';
import UserContext from './UserContext';
import UpdateRating from './UpdateRating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit } from "@fortawesome/free-solid-svg-icons"; // Icons for UI actions

function HomePage() {
  const [ratings, setRatings] = useState([]);
  const { username } = useContext(UserContext);
  //const loggedInUser = localStorage.getItem('username');  // Assuming the logged-in username is stored in local storage

  // This function is now a `useCallback` hook, which will be memoized
  // and can be called again later without being redefined.
  const fetchRatings = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost/comp333_hw3/backend/index.php/ratings/list?limit=100');
      console.log("Backend response:", response.data);
      if (Array.isArray(response.data)) {
        setRatings(response.data);
      } else {
        console.error("Received non-array data from backend:", response.data);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, []); // Empty dependency array means this function is created only once

  // Initial fetch of ratings when the component is mounted
  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  // Function to be passed to DeleteRating to allow it to trigger a refresh
  const handleDeleteSuccess = useCallback(() => {
    fetchRatings(); // Refetch ratings after a delete
  }, [fetchRatings]);

  function renderRatingStars(rating) {
    const starIcons = [];
  
    for (let i = 1; i <= rating; i++) {
      starIcons.push(
        <FontAwesomeIcon
          icon={faStar} // Use the star icon from FontAwesome
          style={{color: "#7ec0dd",}} 
        />
      );
    }
    return starIcons;
  }


  return (
    <div>
      <h2>Home Page</h2>
      {username && <p>Welcome, {username}!</p>} {/* Display the logged-in user's name */}
      <p><Link to="/add-rating">Add Rating</Link></p>
      <p><Link to="/search">Search</Link></p>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Artist</th>
          <th>Song</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(ratings) && ratings.map((rating) => (
          <tr key={rating.id}>
            <td>{rating.id}</td>
            <td>{rating.artist}</td>
            <td>{rating.song}</td>
            <td>{renderRatingStars(rating.rating)}</td>
            <td><Link to={`/view-rating/${rating.id}`}>View</Link></td> 
            {rating.username === username && ( // Check if the rating belongs to the logged-in user
              <td>
                <DeleteRating ratingId={rating.id} onDeleteSuccess={handleDeleteSuccess} />
                <Link to={`/update-rating/${rating.id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{color: "#7ec0dd",}}/> {/* Delete icon */}
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