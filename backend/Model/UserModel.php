<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }
    
    // public function createUsers($limit)
    // {
    //     return $this->insert("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    // }

    public function isUserRegistered($username) {
        // $query = "SELECT * FROM users WHERE username = ?";
        // $stmt = mysqli_prepare($conn, $query);
        // mysqli_stmt_bind_param($stmt, "s", $username);
        // mysqli_stmt_execute($stmt);
        // $result = mysqli_stmt_get_result($stmt);
        // return (mysqli_num_rows($result) > 0);

        $query = "SELECT * FROM users WHERE username = ?";
        $params = ['s', $username]; // 's' indicates string data type

        $result = $this->select($query, $params);

        return count($result) > 0;
    }

    public function registerUser($username, $hashed_password, $salt)
    {
        // $insert_query = "INSERT INTO users (username, pass, salt) VALUES (?, ?, ?)";
        // $insert_stmt = mysqli_prepare($this->connection, $insert_query);
        // mysqli_stmt_bind_param($insert_stmt, "sss", $username, $hashed_password, $salt);
        // mysqli_stmt_execute($insert_stmt);

        $insert_query = "INSERT INTO users (username, pass, salt) VALUES (?, ?, ?)";
        $insert_stmt = mysqli_prepare($this->connection, $insert_query);  // Use $this->connection instead of $conn
    
        if($insert_stmt === false) {
            return false;  // Statement preparation failed
        }
    
        mysqli_stmt_bind_param($insert_stmt, "sss", $username, $hashed_password, $salt);
        
        $result = mysqli_stmt_execute($insert_stmt);
        return $result;

        /*$insert_query = "INSERT INTO users (username, pass, salt) VALUES (?, ?, ?)";
        $params = ['sss', $username, $hashed_password, $salt];*/

        // Execute the database insert operation
        /*try {
            $this->executeStatement($insert_query, $params);
            // Return true to indicate successful registration
            return true;
        } catch (Exception $e) {
            // Handle any database errors and return false to indicate registration failure
            return false;
        }    
    }*/

    }
}