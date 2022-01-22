const { Router } = require('express');
const postControllers = require('../controllers/post');
const middlewares = require('../middlewares');

const postRoutes = Router();

postRoutes.post('/', middlewares.jwtAuth, postControllers.create);
postRoutes.get('/', middlewares.jwtAuth, postControllers.getAll);
postRoutes.get('/search', middlewares.jwtAuth, postControllers.getBySeach);
postRoutes.get('/:id', middlewares.jwtAuth, postControllers.getById);
postRoutes.put('/:id', middlewares.jwtAuth, postControllers.update);
postRoutes.delete('/:id', middlewares.jwtAuth, postControllers.remove);

module.exports = postRoutes;
