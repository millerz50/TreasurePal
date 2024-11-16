<?php


header('Content-Type: application/json');
require_once('../includes/config.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log incoming POST data
error_log(print_r($_POST, true));

function generateRandomString($length = 10) {
    return substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length);
}

$userId = generateRandomString(12);
$verified = "not verified"; // Initialize user verification status
$response = [];

// Retrieve the form data
$fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$pass1 = isset($_POST['pass1']) ? trim($_POST['pass1']) : '';
$pass2 = isset($_POST['pass2']) ? trim($_POST['pass2']) : '';

// Basic validation
if (empty($fullname) || empty($email) || empty($pass1) || empty($pass2)) {
    $response['status'] = 'error';
    $response['message'] = 'All fields are required.';
    echo json_encode($response);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid email format.';
    echo json_encode($response);
    exit;
}

// Validate password complexity
if (strlen($pass1) < 8 || $pass1 !== $pass2) {
    $response['status'] = 'error';
    $response['message'] = 'Passwords must match and be at least 8 characters long.';
    echo json_encode($response);
    exit;
}

// Hash the password
$hashedPassword = password_hash($pass1, PASSWORD_DEFAULT);

// Create a DateTime object
$date = new DateTime();

// Format the date as a string
$formattedDate = $date->format('Y-m-d H:i:s');
try {
    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("INSERT INTO user (UserId, Fullname, email, pass, verifyed,date) VALUES (:userId, :fullname, :email, :hashedPassword, :verified,:date)");
    
    // Bind parameters
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':fullname', $fullname);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':hashedPassword', $hashedPassword);
    $stmt->bindParam(':verified', $verified);
    $stmt->bindParam(':date', $formattedDate);

    // Execute the statement
    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Registration successful!';

        header('Location:succeful/success.php');
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Registration failed: ' . implode(", ", $stmt->errorInfo());
    }
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    $response['status'] = 'error';
    $response['message'] = 'Database error: ' . $e->getMessage();
}

// Return the JSON response
echo json_encode($response);
?>

