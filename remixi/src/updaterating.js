import React, { useState } from 'react';
import axios from 'axios';

function UpdateRating({ ratingId }) {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [rating, setRating] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`http://your-backend-url/rating/${ratingId}`, { artist, song, rating });
      // Handle successful update, e.g., show a message or redirect
    } catch (error) {
      // Handle error, e.g., show a message
    }
  };

  return (
    <div>
      <h2>Update Rating</h2>
      <input type="text" placeholder="Artist" onChange={e => setArtist(e.target.value)} />
      <input type="text" placeholder="Song" onChange={e => setSong(e.target.value)} />
      <input type="number" placeholder="Rating" onChange={e => setRating(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateRating;