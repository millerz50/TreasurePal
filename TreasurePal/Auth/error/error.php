<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Something Went Wrong</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>An Error Occurred</h1>
        <p id="errorMessage">Sorry, something went wrong. Please try again later.</p>
        <div class="error-code" id="errorCode"></div>
        <button onclick="goHome()">Go to Home</button>
        <button onclick="goBack()">Go Back</button>
    </div>

    <script>
        function goHome() {
            window.location.href = 'index.html'; // Redirect to the home page
        }

        function goBack() {
            window.history.back(); // Go back to the previous page
        }

        // Function to display specific error messages
        function displayError(code, message) {
            document.getElementById('errorCode').innerText = `Error Code: ${code}`;
            document.getElementById('errorMessage').innerText = message;
        }

        // Example usage (you can replace this with actual error handling)
        const urlParams = new URLSearchParams(window.location.search);
        const errorCode = urlParams.get('code');
        const errorMessage = urlParams.get('message');

        if (errorCode && errorMessage) {
            displayError(errorCode, errorMessage);
        }
    </script>
</body>
</html>