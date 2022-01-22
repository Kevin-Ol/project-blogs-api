const { StatusCodes } = require('http-status-codes');
const categoriesServices = require('../../services/categories');
const schemas = require('../../schemas');

module.exports = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { error } = schemas.category.validate({ name });

    if (error) return next(error);

    const category = await categoriesServices.create(name);

    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    return next(error);
  }
};
