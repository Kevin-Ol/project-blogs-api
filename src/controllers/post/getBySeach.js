const { StatusCodes } = require('http-status-codes');
const postServices = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { q } = req.query;

    const posts = await postServices.getBySeach(q);

    return res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    return next(error);
  }
};
