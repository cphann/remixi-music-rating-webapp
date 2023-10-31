<?php
class UserController extends BaseController
{
    /** 
* "/users/list" Endpoint - Get list of users 
*/
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getUsers($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function registerAction()
    {
        // Get the request method
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            $userModel = new UserModel();
            $userExists = $userModel->isUserRegistered($username);

            $username = $_POST['username'];
            $password = $_POST['password'];
            $confirm_password = $_POST['confirm_password'];

            // Check if the username already exists
            if ($userExists) {
                $strErrorDesc = 'Username already exists';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';
            } elseif ($password !== $confirm_password) {
                // Check if the passwords match
                $strErrorDesc = 'Passwords do not match';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';
            } elseif (strlen($password) < 10) {
                // Check if the password is at least 10 characters long
                $strErrorDesc = 'Password must be at least 10 characters long';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';
            } else {
                // Hash and salt the password
                $salt = bin2hex(random_bytes(16));
                $salted_password = $password . $salt;
                $hashed_password = password_hash($salted_password, PASSWORD_DEFAULT);

                // Register the user
                $registrationSuccessful = $userModel->registerUser($username, $hashed_password, $salt);

                if ($registrationSuccessful) {
                    $responseData = json_encode(array('message' => 'Registration successful'));
                } else {
                    $strErrorDesc = 'Registration failed';
                    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
                }
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // Respond with appropriate status and message
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    
}