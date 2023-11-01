import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import DeleteRating from './DeleteRating';
//import UpdateRating from './UpdateRating';
/* add after each rating if user logged in made rating
            {rating.username === loggedInUser && (
            <>
              <DeleteRating ratingId={rating.id} />
              <UpdateRating ratingId={rating.id} />
            </>
          )}*/

function HomePage() {
  const [ratings, setRatings] = useState([]);
  //const loggedInUser = localStorage.getItem('username');  // Assuming the logged-in username is stored in local storage

  useEffect(() => {
    const fetchRatings = async () => {
        try {
            const response = await axios.get('http://localhost/comp333_hw3/backend/index.php/ratings/list?limit=100');
            console.log("Backend response:", response.data);
            if (Array.isArray(response.data)) {
                setRatings(response.data);
            } else {
                console.error("Received non-array data from backend:", response.data);
            }
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    };

    fetchRatings();
}, []);

  return (
    <div>
      <h2>Home Page</h2>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Artist</th>
          <th>Song</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(ratings) && ratings.map((rating) => (
          <tr key={rating.id}>
            <td>{rating.id}</td>
            <td>{rating.artist}</td>
            <td>{rating.song}</td>
            <td>{rating.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default HomePage;