import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewRating({ ratingId }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`http://your-backend-url/rating/${ratingId}`);
        setRating(response.data);
      } catch (error) {
        // Handle error, e.g., show a message
      }
    };

    fetchRating();
  }, [ratingId]);

  return (
    <div>
      {rating ? (
        <div>
          <p>Artist: {rating.artist}</p>
          <p>Song: {rating.song}</p>
          <p>Rating: {rating.rating}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewRating;