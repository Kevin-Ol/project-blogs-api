const { StatusCodes } = require('http-status-codes');
const loginServices = require('../../services/login');
const schemas = require('../../schemas');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = schemas.login.validate({ email, password });

    if (error) return next(error);
    
    const { token, loginError } = await loginServices({ email, password });

    if (loginError) return next(loginError);

    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return next(error);
  }
};
