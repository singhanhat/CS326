document.addEventListener('DOMContentLoaded', function() {
    Store.initExampleIntersections(); // Ensure example data is initialized
    loadIntersections(); // Load and display intersections initially and after updates
});

function loadIntersections() {
    const intersections = Store.getIntersections();
    const tbody = document.getElementById('timerSettingsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear previous entries to refresh the table
    intersections.forEach(intersection => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${intersection.location}</td>
            <td>${intersection.number}</td>
            <td>${intersection.currentCondition}</td>
            <td>${intersection.settings}</td>
            <td><button class="change-button" data-number="${intersection.number}">Change</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Use event delegation to handle button clicks for dynamically created buttons
document.getElementById('timerSettingsTable').addEventListener('click', function(event) {
    if (event.target.classList.contains('change-button')) {
        const intersectionNumber = event.target.dataset.number;
        showSettingsModal(intersectionNumber);
    }
});

function showSettingsModal(intersectionNumber) {
    const modal = document.getElementById('settingsModal');
    modal.style.display = 'block';
    modal.dataset.intersectionNumber = intersectionNumber; // Save for applying settings
}


function applyNewSettings() {
    const modal = document.getElementById('settingsModal');
    const intersectionNumber = parseInt(modal.dataset.intersectionNumber, 10);
    const newSetting = document.getElementById('newTrafficLevel').value;
    Store.setTrafficSetting(intersectionNumber, newSetting);
    alert(`Settings for Intersection ${intersectionNumber} changed to ${newSetting}.`);
    modal.style.display = 'none';
    loadIntersections();
}

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('settingsModal').style.display = 'none';
});