<?php
class UserController extends BaseController
{
    /** 
     * "/users/list" Endpoint - Get a list of users
     * This action handles GET requests to retrieve a list of users.
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
                // If 'limit' is provided in the query string, use it instead of the default
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                // Fetch users with the specified limit
                $arrUsers = $userModel->getUsers($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                // Handle exceptions and prepare error message and header
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            // If the request method is not GET, set an error message and header
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // Send the response with either the user data or the error message
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

    /**
     * "/users/register" Endpoint - Handle user registration.
     * This action handles POST requests to register a new user.
     */
    public function registerAction()
    {
        // ... rest of the method

        // Respond with either the success message or error information
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

    /**
     * "/users/login" Endpoint - Handle user login.
     * This action handles POST requests to log in a user.
     */
    public function loginAction() {
        // Start the session for maintaining user state
        session_start();

        // ... rest of the method

        // Send the response with either the login success message or error information
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}