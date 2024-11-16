<?php

function sendVerificationEmail($email) {


    // Generate a random verification code
    $verificationCode = rand(1000, 9999); // 6-digit code

    // Store the code in session (or database) for later verification
    session_start();
    $_SESSION['verification_code'] = $verificationCode;

    // Prepare email
    $subject = "Email Verification Code";
    $message = "Your verification code is: $verificationCode";
    $headers = "From: johwanisi1@gmail.com";

    // Send email
    if(mail($email, $subject, $message, $headers)) {
        return true;
    } else {
        return false;
    }
}

// Example usage
$email = "user@example.com";
if (sendVerificationEmail($email)) {
    echo "Verification code sent to $email.";
} else {
    echo "Failed to send verification code.";
}
?>