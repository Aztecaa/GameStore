const { Game } = require('../models/game.model');
const { Review } = require('../Models/review.model');
const { GameInConsole } = require('../models/gameInConsole.model');
const { Console } = require('../models/console.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre, consoleId } = req.body;

  const newGame = await Game.create({ title, genre });

  await GameInConsole.create({ consoleId, gameId: newGame.id });

  res.status(201).json({
    status: 'success',
    data: { newGame },
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    where: { status: 'active' },
    include: [{ model: Review}, { model: Console }],
  });

  res.status(200).json({
    status: 'success',
    data: { games },
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title } = req.body;

  await game.update({ title });

  res.status(200).json({
    status: 'success',
    data: { game },
  });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
  const { gameId } = req.params;
  const { comment } = req.body;
  const { sessionUser } = req;

  const newReview = await Review.create({ userId: sessionUser.id, gameId, comment });

  res.status(201).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getAllGames,
  createReview,
};
