

$(document).ready(function() {
    // Labels
    const fullnameLabel = $('#fullnameLabel');
    const emailLabel = $('#EmailLabel');
    const firstPassLabel = $('#first_pass_Label');
    const lastPassLabel = $('#last_pass_Label');

    // Inputs
    const fullnameInput = $('#fullname');
    const emailInput = $('#email');
    const pass1Input = $('#pass1');
    const pass2Input = $('#pass2');

    // Functions
    function containsLetters(str) {
        return /[a-zA-Z]/.test(str);
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidPassword(password) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasDigits = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasDigits &&
            hasSpecialChars
        );
    }

    function verifyFullName(fullname) {
        const hasLetters = containsLetters(fullname);
        const hasNumbers = /\d/.test(fullname);

        if (fullname === '' || !hasLetters || hasNumbers) {
            fullnameLabel.css('color', 'red');
            return false;
        }
        fullnameLabel.css('color', 'green');
        return true;
    }

    function verifyEmail(email) {
        if (email === '' || !isValidEmail(email)) {
            emailLabel.css('color', 'red').text('Invalid email format.');
            return false;
        }
        emailLabel.css('color', 'green');
        return true;
    }

    function verifyPassword(pass1) {
        if (pass1 === '' || !isValidPassword(pass1)) {
            firstPassLabel.css('color', 'red');
            return false;
        }
        firstPassLabel.css('color', 'green');
        return true;
    }

    function verifyPass2(pass1, pass2) {
        if (pass2 === '' || pass2 !== pass1) {
            lastPassLabel.css('color', 'red');
            return false;
        }
        lastPassLabel.css('color', 'green');
        return true;
    }

    async function verifyEmailExist(email) {
        if (email === '' || !isValidEmail(email)) {
            emailLabel.css('color', 'red');
            return false;
        }

        try {
            const response = await $.ajax({
                url: 'Auth/EmailExist/EmailExist.php',
                method: 'POST',
                data: { email: email },
                dataType: 'json'
            });

            if (response.status === 'error') {
                emailLabel.css('color', 'red').text(response.message);
                return false;
            } else {
                emailLabel.css('color', 'green').text(response.message);
                return true;
            }
        } catch (error) {
            console.error('Error:', error);
            emailLabel.css('color', 'red').text('An error occurred while checking the email.');
            return false;
        }
    }

    // Event listeners for real-time validation
    fullnameInput.on('input', function() {
        verifyFullName(fullnameInput.val().trim());
    });

    emailInput.on('input', async function() {
        await verifyEmail(emailInput.val().trim());
    });

    pass1Input.on('input', function() {
        verifyPassword(pass1Input.val());
        verifyPass2(pass1Input.val(), pass2Input.val());
    });

    pass2Input.on('input', function() {
        verifyPass2(pass1Input.val(), pass2Input.val());
    });

    // Submit action
    $('#registerForm').on('submit', async function(evt) {
        evt.preventDefault(); // Prevent default form submission

        // Get input values
        const fullname = fullnameInput.val().trim();
        const email = emailInput.val().trim();
        const pass1 = pass1Input.val();
        const pass2 = pass2Input.val();

        // Validate inputs before submission
        const isFullnameValid = verifyFullName(fullname);
        const isEmailValid = verifyEmail(email);
        const isPass1Valid = verifyPassword(pass1);
        const isPass2Valid = verifyPass2(pass1, pass2);
        const isEmailExist = await verifyEmailExist(email); // Await the result of email existence check

        // Check if all validations passed
        if (isFullnameValid && isEmailValid && isPass1Valid && isPass2Valid && !isEmailExist) {
            // Prepare form data
            const formData = $(this).serialize();

            // Send the data to the PHP script
            $.ajax({
                url: 'Auth/createAccount.php',
                method: 'POST',
                data: formData,
                dataType: 'json'
            })
            .done(function(result) {
                const messageDiv = $('#message');
                if (result.status === 'success') {
                    messageDiv.text('Registration successful!').css('color', 'green');
                } else {
                    messageDiv.text('Error: ' + result.message).css('color', 'red');
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#message').text('An unexpected error occurred.').css('color', 'red');
            });
        }
    });
});
