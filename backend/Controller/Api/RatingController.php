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
    }