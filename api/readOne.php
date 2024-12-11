<?php
// Include CORS handler
include_once '../helpers/cors.php';

// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
    return;
}

// Headers (Content-Type is already handled in cors.php)
header('Content-Type: application/json');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

// Instantiate Database and Bookmark
$database = new Database();
$dbConnection = $database->connect();
$bookmark = new Bookmark($dbConnection);

// Check if 'id' parameter exists
if (!isset($_GET['id'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Error: Missing required query parameter id.']);
    return;
}

// Set bookmark ID
$bookmark->setId($_GET['id']);

// Get bookmark
if ($bookmark->readOne()) {
    $result = [
        'id' => $bookmark->getId(),
        'title' => $bookmark->getTitle(),
        'link' => $bookmark->getLink(),
        'dateAdded' => $bookmark->getDateAdded()
    ];
    echo json_encode($result);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Error: Bookmark not found.']);
}
