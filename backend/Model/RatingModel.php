<?php

require_once PROJECT_ROOT_PATH . "/Model/Database.php";

// Define a RatingModel class that extends the Database class to interact with the ratings data.
class RatingModel extends Database
{
    // Retrieves a limited list of ratings from the database.
    public function getRatings($limit)
    {
        // Perform a database query to select all ratings with a limit and return the results.
        return $this->select("SELECT * FROM ratings ORDER BY id ASC LIMIT ?", "i", [$limit]);
    }

    // Retrieves a single rating by its ID.
    public function getRatingById($ratingId)
    {
        // Prepare the SQL query to select a rating by ID.
        $query = "SELECT * FROM ratings WHERE id = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "i", $ratingId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        // Fetch the result as an associative array.
        $rating = mysqli_fetch_assoc($result);
        return $rating;
    }

    // Inserts a new rating into the database.
    public function addRating($username, $artist, $song, $rating) {
        // Prepare an SQL statement to insert a new rating.
        $query = "INSERT INTO ratings (username, artist, song, rating) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "sssi", $username, $artist, $song, $rating);
        mysqli_stmt_execute($stmt);
        // Check if the insertion was successful.
        return mysqli_stmt_affected_rows($stmt) > 0;
    }

    // Deletes a rating from the database.
    public function deleteRating($ratingId, $username) {
        // Prepare an SQL statement to delete a rating by ID and username.
        $query = "DELETE FROM ratings WHERE id = ? AND username = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "is", $ratingId, $username);
        mysqli_stmt_execute($stmt);
        // Check if the deletion was successful.
        return mysqli_stmt_affected_rows($stmt) > 0;
    }
  
    // Searches ratings based on provided criteria.
    public function searchRatings($artist = null, $song = null, $minRating = null, $maxRating = null) {
        // Start with a base SQL query.
        $query = "SELECT * FROM ratings WHERE 1=1";
        $types = '';
        $params = [];

        // Add conditions for artist name if provided.
        if ($artist !== null && $artist !== '') {
            $query .= " AND artist LIKE ?";
            $types .= 's'; // string type
            $params[] = $artist;
        }

        // Add conditions for song name if provided.
        if ($song !== null && $song !== '') {
            $query .= " AND song LIKE ?";
            $types .= 's';
            $params[] = $song;
        }

        // Add conditions for minimum rating if provided.
        if ($minRating !== null && is_numeric($minRating)) {
            $query .= " AND rating >= ?";
            $types .= 'i'; // integer type
            $params[] = $minRating;
        }

        // Add conditions for maximum rating if provided.
        if ($maxRating !== null && is_numeric($maxRating)) {
            $query .= " AND rating <= ?";
            $types .= 'i';
            $params[] = $maxRating;
        }

        // Execute the query with the parameters if any were added.
        return $types ? $this->select($query, $types, $params) : $this->select($query);
    }

    // Retrieves a rating by username, artist, and song combination.
    public function getRatingByUserArtistSong($username, $artist, $song) {
        $query = "SELECT * FROM ratings WHERE username = ? AND artist = ? AND song = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        if (!$stmt) {
            // Handle error, possibly using mysqli_error($this->connection)
            return false;
        }
        mysqli_stmt_bind_param($stmt, "sss", $username, $artist, $song);
        if (!mysqli_stmt_execute($stmt)) {
            // Handle error, possibly using mysqli_stmt_error($stmt)
            return false;
        }
        $result = mysqli_stmt_get_result($stmt);
        if (!$result) {
            // Handle error, possibly using mysqli_error($this->connection)
            return false;
        }
        return mysqli_fetch_assoc($result) !== null;
    }
    

    // Updates a rating in the database.
    public function updateRating($ratingId, $username, $artist, $song, $rating) {
        // Prepare an SQL statement to update an existing rating.
        $query = "UPDATE ratings SET username = ?, artist = ?, song = ?, rating = ? WHERE id = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "ssssi", $username, $artist, $song, $rating, $ratingId);
        mysqli_stmt_execute($stmt);
        // Check if the update was successful.
        return mysqli_stmt_affected_rows($stmt) > 0;
    }

}
?>
