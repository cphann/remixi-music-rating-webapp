import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ViewRating() {
  const [rating, setRating] = useState(null);
  const { id } = useParams(); // Get the rating ID from the URL
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/homepage');
  };

  useEffect(() => {
    const fetchRating = async () => {
        try {
            console.log("Fetching rating for ID:", id); // debug log
            const response = await axios.get(`http://localhost/comp333_hw3/backend/index.php/ratings/view?id=${id}`);
            console.log("Response data:", response.data); // debug log
            if (response.data && response.data.id) {
                setRating(response.data);
            } else {
                console.error("Received unexpected data from backend:", response.data);
            }
        } catch (error) {
            console.error("Error fetching rating:", error);
        }
    };

    fetchRating();
}, [id]);

  return (
    <div>
      <h2>Rating Details</h2>
      {rating && (
        <>
          <p><strong>ID:</strong> {rating.id}</p>
          <p><strong>Artist:</strong> {rating.artist}</p>
          <p><strong>Song:</strong> {rating.song}</p>
          <p><strong>Rating:</strong> {rating.rating}</p>
        </>
      )}
      <p><button type="button" onClick={handleBack}>Back to Home</button></p>
    </div>
  );
}

export default ViewRating;
