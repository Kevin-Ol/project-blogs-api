const { StatusCodes } = require('http-status-codes');
const userServices = require('../../services/user');
const schemas = require('../../schemas');

module.exports = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { error } = schemas.user.validate({ displayName, email, password, image });

    if (error) return next(error);
    
    const token = await userServices.create({ displayName, email, password, image });

    if (token.message) return next(token);

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    return next(error);
  }
};
