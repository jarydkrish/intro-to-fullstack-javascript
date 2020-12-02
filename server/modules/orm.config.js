const Sequelize = require('sequelize');

// Configure Sequelize instance
let sequelize = null;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, { operatorsAliases: false });
} else {
  console.log('DATABASE_URL environment variable not found');
}

// Optional: Test the connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;