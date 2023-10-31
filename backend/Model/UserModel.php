<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }
    public function createUsers($limit)
    {
        return $this->insert("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }

    public function isUserRegistered($username) {
        $query = "SELECT * FROM users WHERE username = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return (mysqli_num_rows($result) > 0);
    }

    public function createUser($userData)
    {
        $insert_query = "INSERT INTO users (username, pass, salt) VALUES (?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $insert_query);
        mysqli_stmt_bind_param($insert_stmt, "sss", $username, $hashed_password, $salt);
        mysqli_stmt_execute($insert_stmt);
    }
}