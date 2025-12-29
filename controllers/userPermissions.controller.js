const db = require('../middleware/mysqldb');
const UserPermissionModel = require('../models/userPermission.model');

exports.getAllUserPermissions = async (req, res) => {
    try {
        let userPermissionRows = [];
        const rows = await db.getUserPermissions();
        rows.forEach(row => {
            const userPermission = new UserPermissionModel(row.id, row.user_id, row.permission_id);
            userPermissionRows.push(userPermission);
        });
        res.json(userPermissionRows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserPermissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await db.getUserPermission(id);
        if (row) {
            const userPermission = new UserPermissionModel(row.id, row.user_id, row.permission_id);
            res.json(userPermission);
        } else {
            res.status(404).json({ message: 'User Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUserPermission = async (req, res) => {
    try {
        const { user_id, permission_id } = req.body;
        const id = await db.insertUserPermission({ user_id, permission_id });
        res.status(201).json({ id, user_id, permission_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserPermission = async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, permission_id } = req.body;
        await db.updateUserPermission(id, { user_id, permission_id });
        res.json({ message: 'User Permission updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUserPermission = async (req, res) => {
    try {
        const id = req.params.id;
        await db.deleteUserPermission(id);
        res.json({ message: 'User Permission deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};