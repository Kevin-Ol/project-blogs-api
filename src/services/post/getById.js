const { BlogPost, User, Category } = require('../../sequelize/models');
const { errorTypes } = require('../../utils');

module.exports = async (id) => {
  const post = await BlogPost.findByPk(
    id,
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
    );

  if (!post) return { postError: errorTypes.postNotFound };

  return { post };
};
