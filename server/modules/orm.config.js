const Sequelize = require('sequelize');

// Configure Sequelize instance from DATABASE_URL env variable
let sequelize = new Sequelize(process.env.DATABASE_URL);

// Optional: Test the connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;