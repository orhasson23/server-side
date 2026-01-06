const UserPermission = require('../models/userPermission.model');

exports.getAllUserPermissions = async (req, res) => {
    try {
        const userPermissions = await UserPermission.findAll({
            include: [
                { model: require('../models/user.model'), as: 'User' },
                { model: require('../models/permission.model'), as: 'Permission' }
            ]
        });
        res.json(userPermissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserPermissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const userPermission = await UserPermission.findByPk(id, {
            include: [
                { model: require('../models/user.model'), as: 'User' },
                { model: require('../models/permission.model'), as: 'Permission' }
            ]
        });
        if (userPermission) {
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
        const userPermission = await UserPermission.create({ user_id, permission_id });
        res.status(201).json(userPermission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUserPermission = async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, permission_id } = req.body;
        const [updated] = await UserPermission.update({ user_id, permission_id }, { where: { id } });
        if (updated) {
            res.json({ message: 'User Permission updated' });
        } else {
            res.status(404).json({ message: 'User Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUserPermission = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await UserPermission.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'User Permission deleted' });
        } else {
            res.status(404).json({ message: 'User Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};