const { Sequelize } = require('sequelize');

// Database configuration using SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Disable SQL logging in console
});

module.exports = sequelize;