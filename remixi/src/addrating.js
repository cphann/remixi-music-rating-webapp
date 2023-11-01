import React, { useState } from 'react';
import axios from 'axios';

function AddRating() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://your-backend-url/rating', { artist, song, rating });
      // Handle successful addition, e.g., show a message or redirect
    } catch (error) {
      // Handle error, e.g., show a message
    }
  };

  return (
    <div>
      <h2>Add Rating</h2>
      <input type="text" placeholder="Artist" onChange={e => setArtist(e.target.value)} />
      <input type="text" placeholder="Song" onChange={e => setSong(e.target.value)} />
      <input type="number" placeholder="Rating" onChange={e => setRating(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddRating;