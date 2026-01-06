const sequelize = require('./database');
const User = require('../models/user.model');
const Permission = require('../models/permission.model');
const UserPermission = require('../models/userPermission.model');

async function initializeDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models (create tables if they don't exist)
    // Set force: true only for initial setup, then change to false
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');

    // Optional: Seed some initial data
    await seedInitialData();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function seedInitialData() {
  try {
    // Create some sample permissions
    const readPerm = await Permission.create({ name: 'read' });
    const writePerm = await Permission.create({ name: 'write' });
    const adminPerm = await Permission.create({ name: 'admin' });

    // Create a sample user
    const user = await User.create({
      username: 'admin',
      password: 'password123',
      phone: '123-456-7890'
    });

    // Assign permissions to user
    await UserPermission.create({ user_id: user.id, permission_id: readPerm.id });
    await UserPermission.create({ user_id: user.id, permission_id: writePerm.id });
    await UserPermission.create({ user_id: user.id, permission_id: adminPerm.id });

    console.log('Initial data seeded successfully.');
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}

module.exports = { initializeDatabase, sequelize };