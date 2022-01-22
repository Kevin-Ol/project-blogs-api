const { StatusCodes } = require('http-status-codes');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  try {
    const { user } = req;

    await userServices.remove(user);

    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};
