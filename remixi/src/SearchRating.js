// React hooks are imported for managing state within the component
import React, { useState } from 'react';
// useNavigate hook from react-router-dom to allow navigation between routes
import { useNavigate } from 'react-router-dom';

// Define the SearchRating functional component
function SearchRating() {
  // useState hooks to manage search fields and results state
  const [search, setSearch] = useState({
    artist: '',
    song: '',
    minRating: '',
    maxRating: ''
  });
  const [results, setResults] = useState([]); // State to store the search results
  const [searchPerformed, setSearchPerformed] = useState(false); // State to check if a search was performed
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle changes in the search form inputs and update state
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // Function to handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create query parameters string based on search state
    const queryParams = new URLSearchParams();
    // Append search criteria to query params if they are provided
    if (search.artist) queryParams.append('artist', search.artist);
    if (search.song) queryParams.append('song', search.song);
    if (search.minRating) queryParams.append('minRating', search.minRating);
    if (search.maxRating) queryParams.append('maxRating', search.maxRating);

    // Make a GET request to the search API endpoint with the query params
    const response = await fetch(`http://localhost/comp333_hw3/backend/index.php/ratings/search?${queryParams}`, {
      method: 'GET',
    });
    // Handle the response from the server
    if (response.ok) {
        const data = await response.json(); // Parse JSON response
        setResults(data); // Update the results state with the received data
      } else {
        // Handle the error scenario
        console.error('Search failed', response);
      }
      setSearchPerformed(true); // Update the searchPerformed state to true
  };

  // Function to navigate back to the homepage
  const handleBack = () => {
    navigate('/homepage');
  };

  // Render the search form and results
  return (
    <div>
      <h2>Search Ratings</h2>
      <form onSubmit={handleSearch}>
        {/* Inputs for search criteria */}
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
          max="5"
        />
        <input
          type="number"
          placeholder="Maximum Rating"
          name="maxRating"
          value={search.maxRating}
          onChange={handleChange}
          min="1"
          max="5"
        />
        {/* Button to submit the search form */}
        <button type="submit">Search</button>
        {/* Button to go back to the homepage */}
        <p><button type="button" onClick={handleBack}>Back to Home</button></p>
      </form>
      {/* Conditionally render the search results */}
      {searchPerformed && (
        <div>
          <h3>Search Results</h3>
          {/* Check if there are results to display */}
          {results.length > 0 ? (
            <ul>
              {/* Map over the results and display them */}
              {results.map((result, index) => (
                <li key={index}>{`${result.artist} - ${result.song} (Rating: ${result.rating})`}</li>
              ))}
            </ul>
          ) : (
            <p>No search results were found.</p> // Display if no results were found
          )}
        </div>
      )}
    </div>
  );
}

// Export the component for use in other parts of the app
export default SearchRating;