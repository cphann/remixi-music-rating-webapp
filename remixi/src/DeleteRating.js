// Import axios for HTTP requests
import axios from 'axios';
import React, { useContext } from 'react'; // Import useContext hook for accessing context
import UserContext from './UserContext'; // Context to access user information
// FontAwesomeIcon component and specific icon import for UI elements
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trash can icon for delete button

// Define the DeleteRating functional component with props for ratingId and a callback for successful deletion
function DeleteRating({ ratingId, onDeleteSuccess }) {
  // Use context to access the username of the logged-in user
  const { username } = useContext(UserContext);

  // Function to handle the delete action
  const handleDelete = async () => {
    // Confirm with the user before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this rating?");
    if (confirmDelete) {
      try {
        // Send a delete request to the server with the ratingId and username
        const response = await axios.delete(`http://localhost/comp333_hw3/backend/index.php/ratings/deleteRating?id=${ratingId}`, {
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          data: {
            username: username // Provide username as part of the request body
          },
        });
        console.log(response.data); // Log the response data for debugging
        onDeleteSuccess(); // Invoke the callback function passed via props to refresh the list after successful deletion
      } catch (error) {
        // Log any error that occurs during the deletion process
        console.error('Error deleting rating:', error.response || error.message);
      }
    }
  };
  
  // Render a button with a trash can icon for the delete operation
  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} style={{color: "#7ec0dd",}} /> // Styled FontAwesomeIcon as a delete button
    </button>
  );
}

// Export the component for use in other parts of the application
export default DeleteRating;