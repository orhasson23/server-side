const db = require('../middleware/mysqldb');
const UserModel = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        let userRows = [];
        const rows = await db.getUsers();
        rows.forEach(row => {
            const user = new UserModel(row.id, row.username, row.password, row.phone);
            userRows.push(user);
        });
        res.json(userRows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await db.getUser(id);
        if (row) {
            const user = new UserModel(row.id, row.username, row.password, row.phone);
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, password, phone } = req.body;
        const id = await db.insertUser({ username, password, phone });
        res.status(201).json({ id, username, password, phone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, password, phone } = req.body;
        await db.updateUser(id, { username, password, phone });
        res.json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await db.deleteUser(id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


