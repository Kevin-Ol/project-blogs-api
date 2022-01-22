const { StatusCodes } = require('http-status-codes');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  try {
    const users = await userServices.getAll();

    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    return next(error);
  }
};
