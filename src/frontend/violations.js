const URL = "http://localhost:3000"; // Adjust the URL as per your server configuration

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await loadViolations(); // Load violations from the server or use hardcoded data for development
    } catch (error) {
        console.error('Failed to load violations:', error);
        alert('Failed to load violations. Please try again.');
    }
});

/**
 * Loads violations either from the server or uses hardcoded data for development/testing.
 */
async function loadViolations() {
    const isDevelopment = true; // Toggle this for development or production

    let violations;
    if (isDevelopment) {
        // Hardcoded data for development/testing
        violations = [
            { id: 1, registrationNumber: "ABC123", videoUrl: "http://example.com/video1.mp4", timestamp: "2023-07-01T12:00:00Z" },
            { id: 2, registrationNumber: "XYZ789", videoUrl: "http://example.com/video2.mp4", timestamp: "2023-07-02T13:15:00Z" }
        ];
    } else {
        // Fetching data from the server in production
        const response = await fetch(`${URL}/violations`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        violations = await response.json();
    }

    populateTable(violations);
}

/**
 * Populates the HTML table with violation data.
 * @param {Array} violations - An array of violation objects to display.
 */
function populateTable(violations) {
    const tbody = document.getElementById('violationsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing entries

    violations.forEach(violation => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${violation.registrationNumber}</td>
            <td><a href="${violation.videoUrl}" target="_blank">View Video</a></td>
            <td>${violation.timestamp}</td>
            <td>
                <button class="verify-button" onclick="verifyViolation('${violation.id}')">Yes</button>
                <button class="dismiss-button" onclick="dismissViolation('${violation.id}')">No</button>
            </td>
        `;
    });
}

/**
 * Sends a verification request for a specific violation.
 * @param {number} id - The ID of the violation to verify.
 */
 async function dismissViolation(id) {
    const response = await fetch(`${URL}/violations`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    });
    if (!response.ok) {
        alert('Violation dismissed.');
        await loadViolations(); // Refresh the list
    } else {
        alert(`Failed to dismiss violation. Status: ${response.status}`);
    }
}

async function verifyViolation(id) {
    const response = await fetch(`${URL}/violations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', id: id })
    });
    if (!response.ok) {
        alert('Violation verified.');
        await loadViolations(); // Refresh the list
    } else {
        alert('Failed to verify violation.');
    }
}

