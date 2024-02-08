const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite = require('./sqlite3'); // sqlite 모듈 추가

/* POST register a new user */
async function registerUser(username, password) {
    try {
        // Hash the user's password before storing it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await sqlite.createUser(username, hashedPassword);
        return result;
    } catch (error) {
        throw error;
    }
}

/* POST login user */
async function loginUser(username, password) {
    try {
        const user = await sqlite.getUser(username);
        if (!user) {
            throw new Error('User not found');
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ username: username }, 'your-secret-key', { expiresIn: '1h' });
            return token;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser
};


