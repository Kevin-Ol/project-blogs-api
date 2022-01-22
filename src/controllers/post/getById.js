const { StatusCodes } = require('http-status-codes');
const postServices = require('../../services/post');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { post, postError } = await postServices.getById(id);

    if (postError) return next(postError);

    return res.status(StatusCodes.OK).json(post);
  } catch (error) {
    return next(error);
  }
};
