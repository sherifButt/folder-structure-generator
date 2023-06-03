const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feature = sequelize.define('Feature', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  }
});

module.exports = Feature;
