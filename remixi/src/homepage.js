import React, { useState, useEffect, useContext, useCallback   } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteRating from './DeleteRating';
import UserContext from './UserContext';
import UpdateRating from './UpdateRating';

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

  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/add-rating">Add Rating</Link>
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
            <td>{rating.rating}</td>
            <td><Link to={`/view-rating/${rating.id}`}>View</Link></td> 
            {rating.username === username && ( // Check if the rating belongs to the logged-in user
              <td>
                <DeleteRating ratingId={rating.id} onDeleteSuccess={handleDeleteSuccess} />
                <Link to={`/update-rating/${rating.id}`}>Update</Link>
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