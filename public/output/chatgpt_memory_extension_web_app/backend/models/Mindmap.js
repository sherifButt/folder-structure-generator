


const sequelize = new Sequelize('postgres://user:password@localhost:5432/database');

const Mindmap = sequelize.define('Mindmap', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false
  }
});

module.exports = Mindmap;

