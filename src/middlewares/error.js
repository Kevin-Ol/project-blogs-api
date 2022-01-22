const { StatusCodes } = require('http-status-codes');
const { isError } = require('joi');

module.exports = (err, _req, res, _next) => {
  if (isError(err)) {
    const { message } = err;
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }

  if (err.message && err.code) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }

  console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};
