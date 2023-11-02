import axios from 'axios';
import React, { useContext } from 'react';
import UserContext from './UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon

function DeleteRating({ ratingId, onDeleteSuccess }) {
  const { username } = useContext(UserContext);

  const handleDelete = async () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this rating?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8080/comp333_hw3/backend/index.php/ratings/deleteRating?id=${ratingId}`, {
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
    <button onClick={handleDelete}>
    <FontAwesomeIcon icon={faTrash} style={{color: "#7ec0dd",}} />
    </button>
  );
}

export default DeleteRating;
