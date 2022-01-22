const { Router } = require('express');
const userControllers = require('../controllers/user');
const middlewares = require('../middlewares');

const userRoutes = Router();

userRoutes.post('/', userControllers.create);
userRoutes.get('/', middlewares.jwtAuth, userControllers.getAll);
userRoutes.get('/:id', middlewares.jwtAuth, userControllers.getById);
userRoutes.delete('/me', middlewares.jwtAuth, userControllers.remove);

module.exports = userRoutes;
