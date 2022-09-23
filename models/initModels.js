// Models
const { User } = require('./user.model');
const { Game } = require('./game.model');
const { Console } = require('./console.model');
const { Review } = require('./review.model');

const initModels = () => {
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  Game.hasMany(Review, { foreignKey: 'gameId' });
  Review.belongsTo(Game);

  Game.belongsToMany(Console, { through: 'gameInConsole', foreignKey: 'gameId' });
  Console.belongsToMany(Game, { through: 'gameInConsole', foreignKey: 'consoleId' });
};

module.exports = { initModels };
