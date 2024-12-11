<?php
// Include CORS handler
include_once '../helpers/cors.php';

// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    header('Allow: PUT');
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

// Get the PUT data
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (!$data || !isset($data['id']) || !isset($data['title']) || !isset($data['link'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Error: Missing required parameters (id, title, link).']);
    return;
}

// Set bookmark properties
$bookmark->setId($data['id']);
$bookmark->setTitle($data['title']);
$bookmark->setLink($data['link']);

// Update bookmark
if ($bookmark->update()) {
    echo json_encode(['message' => 'Bookmark updated successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error: Bookmark was not updated.']);
}
