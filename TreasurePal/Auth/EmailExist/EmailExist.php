<?php



// error_reporting(E_ALL);
// ini_set('display_errors', 1);
// header('Content-Type: application/json');



// $email = isset($_POST['email']) ? trim($_POST['email']) : '';
// $response = [];

// if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//     $response['status'] = 'error';
//     $response['message'] = 'Invalid email format.';
//     echo json_encode($response);
//     exit;
// }

// try {
//     $stmt = $conn->prepare("SELECT COUNT(*) FROM user WHERE email = :email");
//     $stmt->bindParam(':email', $email);
//     $stmt->execute();

//     $count = $stmt->fetchColumn();

//     if ($count > 0) {
//         $response['status'] = 'error';
//         $response['message'] = 'Email already exists.';
//     } else {
//         $response['status'] = 'success';
//         $response['message'] = 'Email is available.';
//     }
// } catch (PDOException $e) {
//     $response['status'] = 'error';
//     $response['message'] = 'Database error: ' . $e->getMessage();
// }

// echo json_encode($response);

?>