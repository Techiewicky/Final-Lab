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

// Get all bookmarks
$bookmarks = $bookmark->readAll();

if (!empty($bookmarks)) {
    echo json_encode($bookmarks);
} else {
    echo json_encode(['message' => 'No bookmarks found.']);
}
