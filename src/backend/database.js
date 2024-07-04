import PouchDB from "pouchdb";
PouchDB.plugin(require('pouchdb-find'));  // Enable querying

const db = new PouchDB("traffic_management");

// Initialize the database with necessary indexes
db.createIndex({
    index: { fields: ['type', 'username'] }
}).catch(e => console.error('Error creating index', e));

/**
 * Authenticate a user by their username and password.
 * @param {string} username - The username to authenticate.
 * @param {string} password - The password to authenticate.
 * @returns {Promise<Object>}
 */
 export async function authenticateUser(username, password) {
    try {
        const user = await db.get({selector: {username, password}});
        return user.docs.length > 0; // returns true if user exists
    } catch (error) {
        console.error('Authentication error:', error);
        throw new Error('Database error during authentication');
    }
}



/**
 * Save or update traffic light settings.
 * @param {string} id - Unique identifier for the traffic light.
 * @param {Object} settings - Traffic light settings to be saved.
 * @returns {Promise<Object>}
 */
export async function saveTrafficLightSettings(id, settings) {
    try {
        const doc = await db.get(id).catch(() => ({ _id: id, type: 'traffic_light' }));
        const response = await db.put({...doc, ...settings});
        return { status: 'success', data: response };
    } catch (error) {
        return { status: 'error', message: 'Failed to save traffic light settings', error };
    }
}

// Existing functions for traffic violations...

/**
 * Fetches all traffic light settings from the database.
 * @returns {Promise<Object>}
 */
export async function getAllTrafficLightSettings() {
    try {
        const result = await db.find({ selector: { type: 'traffic_light' } });
        return { status: 'success', data: result.docs };
    } catch (error) {
        return { status: 'error', message: 'Failed to retrieve traffic light settings', error };
    }
}

// database.js
async function getViolations() {
    // This is a mock-up; replace with actual database query logic
    return [{ id: 1, registrationNumber: "ABC123", videoUrl: "http://example.com/video1.mp4", timestamp: "2023-07-01T12:00:00Z" }];
}

module.exports = {
    getViolations
};

async function verifyViolation(id) {
    // Update violation as verified
    return db.collection('violations').updateOne({ _id: id }, { $set: { verified: true } });
}

async function dismissViolation(id) {
    // Remove the violation from the database
    return db.collection('violations').deleteOne({ _id: id });
}

module.exports = {  verifyViolation, dismissViolation };
