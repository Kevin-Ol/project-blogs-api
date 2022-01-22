const Sequelize = require('sequelize');
const { BlogPost } = require('../../sequelize/models');
const { errorTypes } = require('../../utils');
const config = require('../../sequelize/config/config');

const sequelize = new Sequelize(config.development);

module.exports = async (user, newPost) => {
  const { title, content, categoryIds } = newPost;

  const { id: userId } = user;

  try {
    const postResult = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ title, content, userId }, { transaction: t });
      await post.addCategories(categoryIds, { transaction: t });
      const { dataValues: columns } = post;
      const { updated, published, ...postWithoutTimeStamps } = columns;
      return postWithoutTimeStamps;
    }); 

    return { postResult };
  } catch (error) {
    const { table } = error;
    if (table === 'Categories') return { postError: errorTypes.categoryNotFound };
    return { postError: errorTypes.userNotFound };
  }
};
