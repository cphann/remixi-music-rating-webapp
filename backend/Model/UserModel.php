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
    public function createUser($userData)
    {
        $salt = bin2hex(random_bytes(16));
        $salted_password = $password . $salt;
        $hashed_password = password_hash($salted_password, PASSWORD_DEFAULT);
    
        //Insert new username and password into users table
        $insert_query = "INSERT INTO users (username, pass, salt) VALUES (?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $insert_query);
        mysqli_stmt_bind_param($insert_stmt, "sss", $username, $hashed_password, $salt);
        mysqli_stmt_execute($insert_stmt);
    }
}