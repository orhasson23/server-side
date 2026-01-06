const Permission = require('../models/permission.model');

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPermissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const permission = await Permission.findByPk(id);
        if (permission) {
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
        const permission = await Permission.create({ name });
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePermission = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const [updated] = await Permission.update({ name }, { where: { id } });
        if (updated) {
            res.json({ message: 'Permission updated' });
        } else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePermission = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Permission.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Permission deleted' });
        } else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};