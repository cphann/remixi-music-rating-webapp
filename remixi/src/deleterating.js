import React from 'react';
import axios from 'axios';

function DeleteRating({ ratingId }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://your-backend-url/rating/${ratingId}`);
      // Handle successful deletion, e.g., show a message or redirect
    } catch (error) {
      // Handle error, e.g., show a message
    }
  };

  return (
    <button onClick={handleDelete}>Delete Rating</button>
  );
}

export default DeleteRating;