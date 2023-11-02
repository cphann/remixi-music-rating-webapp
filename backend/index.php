<?php
// Set headers to control cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // No further action needed for OPTIONS requests
}

// Include the bootstrap file to initialize the application
require __DIR__ . "/inc/bootstrap.php";

// Parse the URI to determine the requested endpoint
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Check if the correct segment is set for the API call
if (isset($uri[4])) {
    switch ($uri[4]) {
        case 'user':
            // If the 'user' segment is called, include the UserController
            if (!isset($uri[5])) {
                // If no further segment is found, it's a bad request
                header("HTTP/1.1 404 Not Found");
                exit();
            }
            require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
            $objController = new UserController();
            break;
        
        case 'ratings':
            // If the 'ratings' segment is called, include the RatingController
            if (!isset($uri[5])) {
                // If no further segment is found, it's a bad request
                header("HTTP/1.1 404 Not Found");
                exit();
            }
            require PROJECT_ROOT_PATH . "/Controller/Api/RatingController.php";
            $objController = new RatingController();
            break;

        default:
            // If the segment is not recognized, it's a bad request
            header("HTTP/1.1 404 Not Found");
            exit();
    }

    // Construct the method name based on the URI
    $strMethodName = $uri[5] . 'Action';
    if (method_exists($objController, $strMethodName)) {
        // If the method exists in the controller, call it
        $objController->{$strMethodName}();
    } else {
        // If the method doesn't exist, it's a bad request
        header("HTTP/1.1 404 Not Found");
        exit();
    }
} else {
    // If the main API segment is not set, it's a bad request
    header("HTTP/1.1 404 Not Found");
    exit();
}
?>