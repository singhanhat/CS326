import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './database.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: "*", // Adjust this to be more restrictive based on your needs
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));



app.options('/login', cors());
// Route for user login
app.post('/login', cors(),async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.authenticateUser(username, password); // assuming this function checks credentials
        if (user) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Server error during authentication');
    }
});




// Routes for managing traffic violations
app.use(express.json());
app.options('/violations', cors());
app.options('/violations/verify/:id', cors());
app.options('/violations/verify/:id', cors());


let violations = [
    { id: 1, registrationNumber: "ABC123", videoUrl: "http://example.com/video1.mp4", timestamp: "2023-07-01T12:00:00Z", verified: false },
    { id: 2, registrationNumber: "XYZ789", videoUrl: "http://example.com/video2.mp4", timestamp: "2023-07-02T13:15:00Z", verified: false }
];

// Function to simulate handling action on violations
async function handleAction(id, action) {
    const index = violations.findIndex(v => v.id === parseInt(id));
    if (index === -1) {
        return { success: false, message: "Violation not found" };
    }

    if (action === 'verify') {
        violations[index].verified = true;
        return { success: true, message: "Violation verified" };
    } else if (action === 'delete') {
        violations.splice(index, 1);
        return { success: true, message: "Violation dismissed" };
    }

    return { success: false, message: "Invalid action" };
}

// Unified endpoint for all violation-related actions
app.route('/violations')
    .get(async (req, res) => {
        // Fetch and return all violations
        res.json(violations);
    })
    .post(async (req, res) => {
        const { id, action } = req.body;
        if (!id || !action) {
            res.status(400).send("ID and action required");
            return;
        }
        const result = await handleAction(id, action);
        if (result.success) {
            res.status(200).send(result.message);
        } else {
            res.status(404).send(result.message);
        }
    })
    .delete(async (req, res) => {
        const { id } = req.body;
        if (!id) {
            res.status(400).send("ID required");
            return;
        }
        const result = await handleAction(id, 'delete');
        if (result.success) {
            res.status(200).send(`Violation with ID ${id} deleted successfully`);
        } else {
            res.status(404).send(`Violation with ID ${id} not found`);
        }
    });


// Routes for managing traffic light settings
app.get('/traffic-lights', async (req, res) => {
    const result = await db.getAllTrafficLightSettings();
    if (result.status === 'success') {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ message: 'Failed to retrieve traffic light settings', error: result.message });
    }
});

app.post('/traffic-lights/:id/settings', async (req, res) => {
    const { id } = req.params;
    const settings = req.body;
    const result = await db.saveTrafficLightSettings(id, settings);
    if (result.status === 'success') {
        res.status(201).json(result.data);
    } else {
        res.status(500).json({ message: 'Failed to save settings', error: result.message });
    }
});

// Generic 404 handler
app.use((req, res) => {
    res.status(404).send('Resource not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
