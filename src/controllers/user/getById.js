const { StatusCodes } = require('http-status-codes');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { user, userError } = await userServices.getById(id);

    if (userError) return next(userError);

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};
