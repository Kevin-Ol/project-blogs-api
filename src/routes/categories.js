const { Router } = require('express');
const categoriesControllers = require('../controllers/categories');
const middlewares = require('../middlewares');

const categoriesRoutes = Router();

categoriesRoutes.post('/', middlewares.jwtAuth, categoriesControllers.create);
categoriesRoutes.get('/', middlewares.jwtAuth, categoriesControllers.getAll);

module.exports = categoriesRoutes;
