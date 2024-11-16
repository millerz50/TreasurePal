
<?php
require_once("../includes/config.php");







try {
  
    $email = $_POST['email'];
    $password = $_POST['password'];
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
       

        // Retrieve the user by email
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        var_dump($user);

        // Verify the password
        if ($user && password_verify($password, $user['pass'])) {
            echo "Login successful!"; // Successful login logic (e.g., start session)

           
        


            header("Location:../index.php");
            session_start();

            $_SESSION['email'] = $user['email']; // Store the user's email in the session
        } else {
            echo "Invalid email or password.";
        }
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>