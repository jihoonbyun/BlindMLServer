const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

function createTables() {
    return new Promise((resolve, reject) => {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}

function createUser(username, password) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
        stmt.run(username, password, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ message: 'User registered successfully' });
            }
            stmt.finalize();
        });
    });
}

function getUser(username) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE username = ?", username, function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = {
    createTables,
    createUser,
    getUser
};
