const Sequelize = require('sequelize');

// Configure Sequelize instance from DATABASE_URL env variable
// Default to an in-memory database if DATABASE_URL is not found
if (!process.env.DATABASE_URL) console.log('DATABASE_URL not found, defaulting to sqlite://:memory in-memory database');
let sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite://:memory');

// Optional: Test the connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;