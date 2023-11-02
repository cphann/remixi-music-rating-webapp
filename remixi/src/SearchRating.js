import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchRating() {
  const [search, setSearch] = useState({
    artist: '',
    song: '',
    minRating: '',
    maxRating: ''
  });
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  // Function to update state from form inputs
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // Function to handle search submit
  const handleSearch = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (search.artist) queryParams.append('artist', search.artist);
    if (search.song) queryParams.append('song', search.song);
    if (search.minRating) queryParams.append('minRating', search.minRating);
    if (search.maxRating) queryParams.append('maxRating', search.maxRating);

    // Example fetch call, replace with your actual search logic and endpoint
    const response = await fetch(`http://localhost/comp333_hw3/backend/index.php/ratings/search?${queryParams}`, {
      method: 'GET',
      // Add your query params based on search criteria
    });
    if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        // Handle error scenario
        console.error('Search failed', response);
      }
      setSearchPerformed(true);
  };

  // Function to navigate back to the homepage
  const handleBack = () => {
    navigate('/homepage');
  };

  return (
    <div>
      <h2>Search Ratings</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Artist"
          name="artist"
          value={search.artist}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Song"
          name="song"
          value={search.song}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Minimum Rating"
          name="minRating"
          value={search.minRating}
          onChange={handleChange}
          min="1"
          max="5.00000000000000000000000"
        />
        <input
          type="number"
          placeholder="Maximum Rating"
          name="maxRating"
          value={search.maxRating}
          onChange={handleChange}
          min="1"
          max="5.00000000000000000000000"
        />
        <button type="submit">Search</button>
        <p><button type="button" onClick={handleBack}>Back to Home</button></p>
      </form>
      {searchPerformed && (
        <div>
          <h3>Search Results</h3>
          {results.length > 0 ? (
            <ul>
              {results.map((result, index) => (
                <li key={index}>{`${result.artist} - ${result.song} (Rating: ${result.rating})`}</li>
              ))}
            </ul>
          ) : (
            <p>No search results were found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchRating;