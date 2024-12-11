<?php
// Include CORS handler
include_once '../helpers/cors.php';

// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
    header('Allow: DELETE');
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

// Get the DELETE data
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (!$data || !isset($data['id'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Error: Missing required parameter id.']);
    return;
}

// Set bookmark ID
$bookmark->setId($data['id']);

// Delete bookmark
if ($bookmark->delete()) {
    echo json_encode(['message' => 'Bookmark deleted successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error: Bookmark was not deleted.']);
}
