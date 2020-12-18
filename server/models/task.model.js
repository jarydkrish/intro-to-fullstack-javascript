const Sequelize = require('sequelize');
const orm = require('../modules/orm.config');

// Model for a task, saved in 'task' table.
// Task should look like:
/*
{
  "id": 28,
  "description": "Take out the trash",
  "done": false,
  "createdAt": "2020-12-16T21:49:58.056Z",
  "updatedAt": "2020-12-16T21:49:58.056Z"
}
*/
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
    defaultValue: false,
  },
  // createdAt and updatedAt automatically generated
});

module.exports = Task;
