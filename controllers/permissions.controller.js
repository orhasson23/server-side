const db = require('../middleware/mysqldb');
const PermissionModel = require('../models/permission.model');

exports.getAllPermissions = async (req, res) => {
    try {
        let permissionRows = [];
        const rows = await db.getPermissions();
        rows.forEach(row => {
            const permission = new PermissionModel(row.id, row.name);
            permissionRows.push(permission);
        });
        res.json(permissionRows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPermissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const row = await db.getPermission(id);
        if (row) {
            const permission = new PermissionModel(row.id, row.name);
            res.json(permission);
        } else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPermission = async (req, res) => {
    try {
        const { name } = req.body;
        const id = await db.insertPermission({ name });
        res.status(201).json({ id, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePermission = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        await db.updatePermission(id, { name });
        res.json({ message: 'Permission updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePermission = async (req, res) => {
    try {
        const id = req.params.id;
        await db.deletePermission(id);
        res.json({ message: 'Permission deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};