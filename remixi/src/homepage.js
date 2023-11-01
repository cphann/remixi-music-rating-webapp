import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteRating from './DeleteRating';
import UpdateRating from './UpdateRating';

function HomePage() {
  const [ratings, setRatings] = useState([]);
  const loggedInUser = localStorage.getItem('username');  // Assuming the logged-in username is stored in local storage

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get('http://your-backend-url/ratings');
        setRatings(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchRatings();
  }, []);

  return (
    <div>
      <h2>Your Ratings</h2>
      {ratings.map(rating => (
        <div key={rating.id}>
          <p>Artist: {rating.artist}</p>
          <p>Song: {rating.song}</p>
          <p>Rating: {rating.rating}</p>
          {rating.username === loggedInUser && (
            <>
              <DeleteRating ratingId={rating.id} />
              <UpdateRating ratingId={rating.id} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;