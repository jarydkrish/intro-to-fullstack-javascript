const Sequelize = require('sequelize');
const sequelize = require('../modules/orm.config');

const config = {
  freezeTableName: true, // Don't use plural for table names
  underscored: true,  // Use snake_case not camelCase for attributes
}

// Model for a task
const Task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  done: {
    type: Sequelize.BOOLEAN, 
    allowNull: false,
  }
});

module.exports = Task;