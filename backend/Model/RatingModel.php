<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class RatingModel extends Database
{
    public function getRatings($limit)
    {
        return $this->select("SELECT * FROM ratings ORDER BY id ASC LIMIT ?", ["i", $limit]);
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
        // Check if a rating with the given ID and username exists
        $query = "SELECT id FROM ratings WHERE id = ? AND username = ?";
            
        $stmt = mysqli_prepare($this->connection, $query);
        mysqli_stmt_bind_param($stmt, "is", $ratingId, $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $rating = mysqli_fetch_assoc($result);

        if (!$rating) {
            return false; // Rating with given ID and username doesn't exist
        }

        // Delete the rating
        $query = "DELETE FROM ratings WHERE id = ? AND username = ?";
        mysqli_stmt_bind_param($stmt, "is", $ratingId, $username);
        mysqli_stmt_execute($stmt);
        
        return mysqli_stmt_affected_rows($stmt) > 0;
    }
   
}