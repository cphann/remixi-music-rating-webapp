import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UpdateRating = ({ match }) => {
    const [rating, setRating] = useState({
        username: '',
        artist: '',
        song: '',
        rating: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    // const ratingId = match.params.id; // Assuming you're using react-router-dom

    useEffect(() => {
        // Fetch the existing rating details to prepopulate the form
        const fetchRating = async () => {
            try {
                // Assuming 'getRatingById' is a dedicated GET endpoint for fetching rating details
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
                // You may want to navigate to the homepage or perform some other action here
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
                {/* Form fields prepopulated with the existing rating */}
                <input type="text" name="artist" value={rating.artist} onChange={handleInputChange} required /> <br/>
                <input type="text" name="song" value={rating.song} onChange={handleInputChange} required /> <br/>
                <input type="number" name="rating" value={rating.rating} onChange={handleInputChange} required /> <br/>
                <button type="submit">Update</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default UpdateRating;
