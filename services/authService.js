const jwt = require('jsonwebtoken');
const initializeDB = require('../config/database.js');
const {validateLogin} = require('../utils/validate.js');
require('dotenv').config();

let db;
initializeDB().then(database => {
  db = database;
});

const loginUser = async (username, password) => {
    try {
        validateLogin(username, password);
        const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET);
        return { jwtToken };
    }
    catch (error) {
        throw error;
    }
}

module.exports = {loginUser};