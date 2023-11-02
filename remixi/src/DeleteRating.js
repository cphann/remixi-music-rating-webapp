import axios from 'axios';
import React, { useContext } from 'react';
import UserContext from './UserContext';

function DeleteRating({ ratingId, onDeleteSuccess }) {
  const { username } = useContext(UserContext);

  const handleDelete = async () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this rating?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost/comp333_hw3/backend/index.php/ratings/deleteRating?id=${ratingId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { // axios delete method includes the request body in the `data` property
            username: username
          },
        });
        console.log(response.data);
        onDeleteSuccess(); // Refresh the list
      } catch (error) {
        console.error('Error deleting rating:', error.response || error.message);
      }
    }
  };
  

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteRating;
