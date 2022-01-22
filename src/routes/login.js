const { Router } = require('express');
const loginController = require('../controllers/login');

const loginRoutes = Router();

loginRoutes.post('/', loginController);

module.exports = loginRoutes;
