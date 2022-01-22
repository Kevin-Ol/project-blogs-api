const { StatusCodes } = require('http-status-codes');
const postServices = require('../../services/post');
const schemas = require('../../schemas');
const { errorTypes } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.params;
    const { user } = req;

    if (categoryIds) return next(errorTypes.categoriesCannotBeEdited);

    const { error } = schemas.editPost.validate({ title, content });

    if (error) return next(error);
    
    const { editedPost, postError } = await postServices.update(id, user, { title, content });

    if (postError) return next(postError);

    return res.status(StatusCodes.OK).json(editedPost);
  } catch (error) {
    return next(error);
  }
};
