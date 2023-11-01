<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     exit;
// }

// require __DIR__ . "/inc/bootstrap.php";
// $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// $uri = explode( '/', $uri );
// if ((isset($uri[4]) && $uri[4] != 'user') || !isset($uri[5])) {
//     header("HTTP/1.1 404 Not Found");
//     exit();
// }
// require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
// $objFeedController = new UserController();
// $strMethodName = $uri[5] . 'Action';
// $objFeedController->{$strMethodName}();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if (isset($uri[4])) {
    switch ($uri[4]) {
        case 'user':
            if (!isset($uri[5])) {
                header("HTTP/1.1 404 Not Found");
                exit();
            }
            require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
            $objController = new UserController();
            break;
        
        case 'ratings':
            if (!isset($uri[5])) {
                header("HTTP/1.1 404 Not Found");
                exit();
            }
            require PROJECT_ROOT_PATH . "/Controller/Api/RatingController.php";
            $objController = new RatingController();
            break;

        default:
            header("HTTP/1.1 404 Not Found");
            exit();
    }

    $strMethodName = $uri[5] . 'Action';
    if (method_exists($objController, $strMethodName)) {
        $objController->{$strMethodName}();
    } else {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}
?>