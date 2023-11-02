import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateRating = ({ match }) => {
    const [rating, setRating] = useState({
        username: '',
        artist: '',
        song: '',
        rating: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    
    const handleCancel = () => {
        navigate('/homepage');
    };
    useEffect(() => {
        // Fetch the existing rating details to prepopulate the form
        const fetchRating = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/comp333_hw3/backend/index.php/ratings/view?id=${id}`);
                setRating(response.data);
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Failed to fetch rating details.');
                }
            }
        };
    
        fetchRating();
    }, [id]);
    

    //updates the component's state whenever a user makes changes to any of the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRating({
            ...rating,
            [name]: value
        });
    };

    //sends the updated data to the backend when the form is submitted.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/comp333_hw3/backend/index.php/ratings/updateRating?id=${id}`, rating);
            if (response.data.message) {
                alert('Rating updated successfully');
                navigate('/homepage');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred while trying to update the rating.');
            }
        }
    };

    return (
        <div>
            <h2>Update Rating</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="artist" value={rating.artist} onChange={handleInputChange} required /> <br/>
                <input type="text" name="song" value={rating.song} onChange={handleInputChange} required /> <br/>
                <input type="number" name="rating" value={rating.rating} onChange={handleInputChange} min="1" max="5" required /> <br/>
                <button type="submit">Update</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleCancel}>Cancel</button>
        </div>
        
    );
};

export default UpdateRating;
