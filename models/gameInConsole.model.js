const {db, DataTypes} = require('../utils/database.util');

const GameInConsole = db.define('gameInConsole', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'
  }
})

module.exports = {
  GameInConsole
};