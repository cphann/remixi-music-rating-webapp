// Import necessary hooks and packages
import React, { useState, useContext } from 'react';
import axios from 'axios'; // Axios for HTTP requests
import UserContext from './UserContext'; // Context for user state
import { useNavigate } from 'react-router-dom'; // Hook for navigating routes

// Define the AddRating functional component
export default function AddRating() {
    // State hooks to store the input values and message
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [rating, setRating] = useState(0);
    
    // Extract username from the UserContext
    const { username } = useContext(UserContext); 
    const [message, setMessage] = useState('');
    
    // Hook for navigation function
    const navigate = useNavigate();
    
    // Function to navigate back to the homepage on cancel
    const handleCancel = () => {
        navigate('/homepage');
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behaviour

        try {
            // Perform a POST request to the backend to submit the new rating
            const response = await axios.post('http://localhost/comp333_hw3/backend/index.php/ratings/addRating', {
                username,
                artist,
                song,
                rating
            });
            
            // Set message on successful submission and alert the user
            setMessage(response.data.message || 'Rating submitted successfully!');
            alert('Rating added successfully');
            navigate('/homepage'); // Redirect user to homepage
        } catch (error) {
            // Set error message if request fails
            setMessage(error.response?.data.error || 'An error occurred while submitting the rating.');
        }
    };

    // Render form for inputting a new rating and buttons for submit and cancel
    return (
        <div>
            <h2>Add Rating</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                    required // Fields are required for submission
                />
                <input
                    type="text"
                    placeholder="Song"
                    value={song}
                    onChange={e => setSong(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    min="1"
                    max="5" // Rating must be between 1 and 5
                    required
                />
                <button type="submit">Submit Rating</button>
            </form>
            {message && <p>{message}</p>} // Display any message if present
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}