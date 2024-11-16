<?php

require_once('../includes/config.php'); // Include your database configuration
header('Content-Type: application/json'); // Set the header for JSON output

// Enable error reporting for debugging (only in development)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get the raw POST data
$rawData = file_get_contents('php://input');

// Log the raw data for debugging (optional, remove in production)
file_put_contents('log.txt', $rawData . PHP_EOL, FILE_APPEND);

// Decode the JSON data
$data = json_decode($rawData, true);

// Check for JSON parsing errors
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit; // Stop further execution
}

// Validate required fields
$requiredFields = ['ip', 'country', 'region', 'city', 'loc'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(['status' => 'error', 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Extract latitude and longitude
$location = explode(',', $data['loc']);
if (count($location) !== 2) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid location format']);
    exit;
}

$latitude = (float) $location[0];
$longitude = (float) $location[1];

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO ip_locations (ip, country, region, city, latitude, longitude, data) VALUES (?, ?, ?, ?, ?, ?, ?)");
if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare SQL statement: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ssssdds", 
    $data['ip'], 
    $data['country'], 
    $data['region'], 
    $data['city'], 
    $latitude, 
    $longitude, 
    json_encode($data)
);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data stored successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>