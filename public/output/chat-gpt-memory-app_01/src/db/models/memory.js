const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Memory = sequelize.define('Memory', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  promptId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  featureId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  taskIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Memory;
