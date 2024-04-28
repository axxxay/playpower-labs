const authService = require('../services/authService');

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const response = await authService.loginUser(username, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

module.exports = {
    loginUser
};