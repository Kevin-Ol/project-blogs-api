const { StatusCodes } = require('http-status-codes');
const categoriesServices = require('../../services/categories');

module.exports = async (req, res, next) => {
  try {
    const categories = await categoriesServices.getAll();

    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    return next(error);
  }
};
