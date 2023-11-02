import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext'; 
import { useNavigate } from 'react-router-dom';

export default function AddRating() {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [rating, setRating] = useState(0);
    const { username } = useContext(UserContext); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleCancel = () => {
        navigate('/homepage');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/comp333_hw3/backend/index.php/ratings/addRating', {
                username,
                artist,
                song,
                rating
            });
            setMessage(response.data.message || 'Rating submitted successfully!');
            alert('Rating added successfully');
            navigate('/homepage');
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
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}
