const { StatusCodes } = require('http-status-codes');
const postServices = require('../../services/post');
const schemas = require('../../schemas');

module.exports = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;

    const { error } = schemas.post.validate({ title, content, categoryIds });

    if (error) return next(error);
    
    const { postResult, postError } = await postServices.create(
      user,
      { title, content, categoryIds },
    );

    if (postError) return next(postError);

    return res.status(StatusCodes.CREATED).json(postResult);
  } catch (error) {
    return next(error);
  }
};
