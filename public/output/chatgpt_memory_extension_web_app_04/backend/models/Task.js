// Sure, here's an implementation of Task.js:


const sequelize = require('../database');

const Task = sequelize.define('Task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  priority: {
    type: Sequelize.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium',
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = Task;
