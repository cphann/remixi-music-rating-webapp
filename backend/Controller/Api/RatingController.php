<?php
class RatingController extends BaseController
{
    /** 
* "/ratings/list" Endpoint - Get list of ratings 
*/
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $ratingModel = new RatingModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrRatings = $ratingModel->getRatings($intLimit);
                $responseData = json_encode($arrRatings);
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

    public function viewAction()
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        // Check if the request method is GET
        if (strtoupper($requestMethod) !== 'GET') {
            $this->sendOutput(json_encode(['error' => 'Method not supported']), ['Content-Type: application/json', 'HTTP/1.1 405 Method Not Allowed']);
            return;
        }

        $ratingId = $_GET['id'] ?? null;

        if (!$ratingId) {
            $this->sendOutput(json_encode(['error' => 'Missing rating ID']), ['Content-Type: application/json', 'HTTP/1.1 400 Bad Request']);
            return;
        }

        $ratingModel = new RatingModel();
        $rating = $ratingModel->getRatingById($ratingId);

        if ($rating) {
            $this->sendOutput(json_encode($rating), ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
        } else {
            $this->sendOutput(json_encode(['error' => 'Rating not found']), ['Content-Type: application/json', 'HTTP/1.1 404 Not Found']);
        }
    }

    public function addRatingAction() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
    
        // Check if the request method is POST
        if (strtoupper($requestMethod) !== 'POST') {
            $this->sendOutput(json_encode(['error' => 'Method not supported']), ['Content-Type: application/json', 'HTTP/1.1 405 Method Not Allowed']);
            return;
        }
    
        $postData = json_decode(file_get_contents('php://input'), true);
    
        if (!isset($postData['username']) || !isset($postData['artist']) || !isset($postData['song']) || !isset($postData['rating'])) {
            $this->sendOutput(json_encode(['error' => 'Missing required fields']), ['Content-Type: application/json', 'HTTP/1.1 400 Bad Request']);
            return;
        }
    
        $ratingModel = new RatingModel();
        $success = $ratingModel->addRating($postData['username'], $postData['artist'], $postData['song'], $postData['rating']);
    
        if ($success) {
            $this->sendOutput(json_encode(['message' => 'Rating added successfully']), ['Content-Type: application/json', 'HTTP/1.1 201 Created']);
        } else {
            $this->sendOutput(json_encode(['error' => 'Failed to add rating']), ['Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error']);
        }
    }

    public function deleteRatingAction() {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if ($requestMethod == 'DELETE') {
            $postData = json_decode(file_get_contents('php://input'), true);
            $ratingId = $_GET['id'] ?? null;  // get rating id 
            $username = $postData['username'] ?? null;// get logged in username

            if (!$ratingId) {
                $this->sendOutput(json_encode(['error' => 'Rating ID not provided']), ['Content-Type: application/json', 'HTTP/1.1 400 Bad Requests']);
            }

            $ratingModel = new RatingModel();
            $result = $ratingModel->deleteRating($ratingId, $username);

            if ($result) {
                $this->sendOutput(json_encode(['message' => 'Rating deleted successfully']), ['Content-Type: application/json', 'HTTP/1.1 201 Created']);
            } else {
                $this->sendOutput(json_encode(['error' => 'Failed to delete rating']), ['Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error']);
            }
        } else {
            $this->sendOutput(json_encode(['error' => 'Method not supported']), ['Content-Type: application/json', 'HTTP/1.1 405 Method Not Allowed']);
        }
    }
}