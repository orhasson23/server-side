const controller = require('../controllers/userPermissions.controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAllUserPermissions);
router.get('/:id', controller.getUserPermissionById);
router.post('/', controller.createUserPermission);
router.put('/:id', controller.updateUserPermission);
router.delete('/:id', controller.deleteUserPermission);

module.exports = router;