<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class RatingModel extends Database
{
    public function getRatings($limit)
    {
        return $this->select("SELECT * FROM ratings ORDER BY id ASC LIMIT ?", "i", [$limit]);
    }

    public function getRatingById($ratingId)
    {
        $query = "SELECT * FROM ratings WHERE id = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "i", $ratingId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $rating = mysqli_fetch_assoc($result);
        return $rating;
    }

    public function addRating($username, $artist, $song, $rating) {
        $query = "INSERT INTO ratings (username, artist, song, rating) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "sssi", $username, $artist, $song, $rating);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt) > 0;
    }

    public function deleteRating($ratingId, $username) {

        // Delete the rating
        $query = "DELETE FROM ratings WHERE id = ? AND username = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "is", $ratingId, $username);
        mysqli_stmt_execute($stmt);
        
        return mysqli_stmt_affected_rows($stmt) > 0;
    }
  
    public function searchRatings($artist = null, $song = null, $minRating = null, $maxRating = null) {
        $query = "SELECT * FROM ratings WHERE 1=1";
        $types = '';
        $params = [];

        // Check if artist is provided and not empty
        if ($artist !== null && $artist !== '') {
            $query .= " AND artist LIKE ?";
            $types .= 's'; // string type
            $params[] = $artist;
        }

        // Check if song is provided and not empty
        if ($song !== null && $song !== '') {
            $query .= " AND song LIKE ?";
            $types .= 's';
            $params[] = $song;
        }

        // Check if minRating is provided and is a number
        if ($minRating !== null && is_numeric($minRating)) {
            $query .= " AND rating >= ?";
            $types .= 'i'; // integer type
            $params[] = $minRating;
        }

        // Check if maxRating is provided and is a number
        if ($maxRating !== null && is_numeric($maxRating)) {
            $query .= " AND rating <= ?";
            $types .= 'i';
            $params[] = $maxRating;
        }

        // Bind the parameters if any conditions were added
        if ($types) {
            return $this->select($query, $types, $params);
        } else {
            // If no conditions were added, no need for binding parameters
            return $this->select($query);
        }
    }

    public function getRatingByUserArtistSong($username, $artist, $song) {
        $query = "SELECT * FROM ratings WHERE username = ? AND artist = ? AND song = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "sss", $username, $artist, $song);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public function updateRating($ratingId, $username, $artist, $song, $rating) {
        $query = "UPDATE ratings SET username = ?, artist = ?, song = ?, rating = ? WHERE id = ?";
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "ssssi", $username, $artist, $song, $rating, $ratingId);
        mysqli_stmt_execute($stmt);
        return mysqli_stmt_affected_rows($stmt) > 0;
    }

}