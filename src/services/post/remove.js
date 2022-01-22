const { BlogPost } = require('../../sequelize/models');
const { errorTypes } = require('../../utils');

module.exports = async (id, user) => {
  const oldPost = await BlogPost.findByPk(id);

  if (!oldPost) return { postError: errorTypes.postNotFound };

  if (oldPost.userId !== user.id) return { postError: errorTypes.unauthorizedUser };

  await BlogPost.destroy({ where: { id } });

  return {};
};
