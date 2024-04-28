const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, '../classroom.db');

let db = null;
const initializeDB = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
    return db;
}

module.exports = initializeDB