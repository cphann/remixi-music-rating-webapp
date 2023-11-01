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
$uri = explode( '/', $uri );

// Check if it's a user or rating endpoint
$endpointType = $uri[4] ?? null;
$methodName = $uri[5] ?? null;

if (!$endpointType || !$methodName) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$controllerPath = PROJECT_ROOT_PATH . "/Controller/Api/" . ucfirst($endpointType) . "Controller.php";

if (!file_exists($controllerPath)) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

require $controllerPath;
$controllerClass = ucfirst($endpointType) . "Controller";
$controller = new $controllerClass();

$actionName = $methodName . 'Action';

if (!method_exists($controller, $actionName)) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$controller->{$actionName}();

?>