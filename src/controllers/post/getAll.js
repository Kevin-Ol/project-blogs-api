const { StatusCodes } = require('http-status-codes');
const postServices = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const posts = await postServices.getAll();

    return res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    return next(error);
  }
};
