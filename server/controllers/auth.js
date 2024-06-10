require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { connect } = require('getstream');
const { StreamChat } = require('stream-chat').StreamChat;

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID);

        const token = client.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);
        const { users } = await client.queryUsers({ name: username });

        if (!users.length) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = users[0];
        const success = await bcrypt.compare(password, user.hashedPassword);
        const token = serverClient.createUserToken(user.id);

        if (success) {
            res.status(200).json({ token, fullName: user.fullName, username, userId: user.id });
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
