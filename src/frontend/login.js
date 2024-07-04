const URL = "http://localhost:3000"; // Adjust the URL as per your server configuration

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.getElementById('identificationNumber').value;
    const password = document.getElementById('password').value;

    try {
        // Validate credentials either locally for testing or via server for production
        const isValid = await validateCredentials(username, password);
        if (isValid) {
            alert('Login successful!');
            window.location.href = 'dashboard.html'; // Redirect to the dashboard on success
        } else {
            alert('Invalid username or password. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

/**
 * Function to validate credentials. It supports both development/testing and production scenarios.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<boolean>} A promise that resolves to true if credentials are valid, false otherwise.
 */
async function validateCredentials(username, password) {
    const isDevelopment = true;  

    if (isDevelopment) {
        // Hardcoded credential check for development/testing purposes
        return username === "123456" && password === "password";  // Example hardcoded validation
    } else {
        // Dynamic server-side validation for production use
        try {
            const response = await fetch(`${URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            });

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();
            Store.setUser({ identificationNumber: username }); 
            return data.message === 'Login successful';
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    }
}
