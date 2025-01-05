// backend/models/Activity.js
const db = require('../config/db');

class Activity {
    static create(activityData, callback) {
        const query = 'INSERT INTO Activities SET ?';
        db.query(query, activityData, callback);
    }

    static findByUserId(userId, callback) {
        const query = 'SELECT * FROM Activities WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
}

module.exports = Activity;
