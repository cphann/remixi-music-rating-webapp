import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Used for accessing URL parameters
import { useNavigate } from 'react-router-dom'; // Used for programmatic navigation

const UpdateRating = ({ match }) => {
    const [rating, setRating] = useState({
        username: '', // Holds the username of the user who made the rating
        artist: '',   // Holds the artist's name of the rating
        song: '',     // Holds the song title of the rating
        rating: ''    // Holds the rating value
    });
    const [errorMessage, setErrorMessage] = useState(''); // Stores error messages
    const { id } = useParams(); // Retrieves the 'id' URL parameter
    const navigate = useNavigate(); // Hook to allow navigation to different routes
    
    // Function to navigate back to the homepage
    const handleCancel = () => {
        navigate('/homepage');
    };
    
    // UseEffect hook to load rating data when the component mounts or when 'id' changes
    useEffect(() => {
        const fetchRating = async () => {
            try {
                // Make a GET request to retrieve the rating by ID
                const response = await axios.get(`http://localhost/comp333_hw3/backend/index.php/ratings/view?id=${id}`);
                setRating(response.data); // Update the state with the fetched rating data
            } catch (error) {
                // Handle errors by setting the appropriate error message
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Failed to fetch rating details.');
                }
            }
        };
    
        fetchRating();
    }, [id]); // Dependency array with 'id' ensures effect runs when 'id' changes
    

    // Handles form input changes by updating the corresponding state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRating({
            ...rating,
            [name]: value // Update the specific property with the new value
        });
    };

    // Handles the form submission event
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            // Sends a POST request to the update endpoint with the updated rating data
            const response = await axios.post(`http://localhost/comp333_hw3/backend/index.php/ratings/updateRating?id=${id}`, rating);
            if (response.data.message) {
                alert('Rating updated successfully'); // Show success message
                navigate('/homepage'); // Redirect user to the homepage
            }
        } catch (error) {
            // Handle errors that occur during the POST request
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred while trying to update the rating.');
            }
        }
    };

    // JSX to render the Update Rating form
    return (
        <div>
            <h2>Update Rating</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields prepopulated with the existing rating data */}
                <input type="text" name="artist" value={rating.artist} onChange={handleInputChange} required /><br/>
                <input type="text" name="song" value={rating.song} onChange={handleInputChange} required /><br/>
                <input type="number" name="rating" value={rating.rating} onChange={handleInputChange} min="1" max="5" required /><br/>
                <button type="submit">Update</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>} // Display any error messages
            <button onClick={handleCancel}>Cancel</button> // Button to cancel the update and go back
        </div>
        
    );
};

export default UpdateRating;