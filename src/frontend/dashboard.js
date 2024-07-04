document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const user = Store.getUser();


    // Handle button clicks to navigate to different parts of the application
    document.getElementById('verifyViolationsBtn').addEventListener('click', function() {
        window.location.href = 'verify-violations.html';
    });

    document.getElementById('controlLightsBtn').addEventListener('click', function() {
        window.location.href = 'control-timers.html';
    });
});
