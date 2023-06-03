// Sure, here's the implementation of User.js:

// Importing sequelize module
const { Sequelize, DataTypes } = require('sequelize');

// Creating a Sequelize instance
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Creating the User model schema
const User = sequelize.define('User', {
  // Defining the attributes of the User
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false
  }
});

// Exporting the User model
module.exports = User;