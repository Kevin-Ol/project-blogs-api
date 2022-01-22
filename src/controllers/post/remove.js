const { StatusCodes } = require('http-status-codes');
const postServices = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const { postError } = await postServices.remove(id, user);

    if (postError) return next(postError);

    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};
