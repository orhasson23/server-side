const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Permission = require('./permission.model');

const UserPermission = sequelize.define('UserPermission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Permission,
      key: 'id',
    },
  },
}, {
  tableName: 'user_permissions',
  timestamps: false,
});

// Define associations
UserPermission.belongsTo(User, { foreignKey: 'user_id' });
UserPermission.belongsTo(Permission, { foreignKey: 'permission_id' });
User.hasMany(UserPermission, { foreignKey: 'user_id' });
Permission.hasMany(UserPermission, { foreignKey: 'permission_id' });

module.exports = UserPermission;