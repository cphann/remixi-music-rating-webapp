import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext'; 

export default function AddRating() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [rating, setRating] = useState(0);
    const { username } = useContext(UserContext); 
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/comp333_hw3/backend/index.php/rating/addRating', {
                username,
                artist,
                song,
                rating
            });

            // Handle success
            setMessage(response.data.message || 'Rating submitted successfully!');
        } catch (error) {
            // Handle error
            setMessage(error.response?.data.error || 'An error occurred while submitting the rating.');
        }
    };

    return (
        <div>
            <h2>Add Rating</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                    required
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
                    max="5"
                    required
                />
                <button type="submit">Submit Rating</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}
