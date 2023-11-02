<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class UserModel extends Database
{
    //Get a specified number of user records from the database.
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }
    
    // Determine whether a user with the given username is registered and exist in database.
    public function isUserRegistered($username) {
        $stmt = mysqli_prepare($this->connection, "SELECT * FROM users WHERE username = ?");
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return (mysqli_num_rows($result) > 0);
    }

    //Add a new user to the database with username, password hash, and salt.
    public function registerUser($username, $hashed_password, $salt)
    {
        $insert_stmt = mysqli_prepare($this->connection, "INSERT INTO users (username, pass, salt) VALUES (?, ?, ?)");
        mysqli_stmt_bind_param($insert_stmt, "sss", $username, $hashed_password, $salt);
        return mysqli_stmt_execute($insert_stmt);
    }

    //Retrieve information about a user based on their username.
    public function getUser($username) {
        $stmt = mysqli_prepare($this->connection, "SELECT * FROM users WHERE username = ?");
        mysqli_stmt_bind_param($stmt, "s", $username);
    }

}