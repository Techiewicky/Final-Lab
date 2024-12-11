<?php
// Include CORS handler
include_once '../helpers/cors.php';

// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('Allow: POST');
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

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate data
if (!$data || !isset($data['title']) || !isset($data['link'])) {
    http_response_code(422);
    echo json_encode(['message' => 'Error: Missing required parameters (title, link).']);
    return;
}

// Set bookmark properties
$bookmark->setTitle($data['title']);
$bookmark->setLink($data['link']);

// Create bookmark
if ($bookmark->create()) {
    http_response_code(201);
    echo json_encode(['message' => 'Bookmark created successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Error: Bookmark was not created.']);
}
