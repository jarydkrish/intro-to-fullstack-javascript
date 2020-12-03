const Sequelize = require('sequelize');
const orm = require('../modules/orm.config');

// Model for a task, saved in 'task' table
const Task = orm.define('task', {
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
  },
  // createdAt and updatedAt automatically generated
});

module.exports = Task;