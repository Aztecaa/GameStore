const express = require('express');

const {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  createReview,
} = require('../controllers/games.constroller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const { gameExist } = require('../middlewares/games.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

// Protecting below endpoints
gamesRouter.use(protectSession);

gamesRouter.post('/', createGame);

gamesRouter.patch('/:id', gameExist, updateGame);

gamesRouter.delete('/:id', gameExist, deleteGame);

gamesRouter.post('/reviews/:gameId', createReview);

module.exports = { gamesRouter };
