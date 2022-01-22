const { BlogPost, Category } = require('../../sequelize/models');
const { errorTypes } = require('../../utils');

module.exports = async (id, user, editedFields) => {
  const { title, content } = editedFields;

  const oldPost = await BlogPost.findByPk(id);

  if (!oldPost) return { postError: errorTypes.postNotFound };

  if (oldPost.userId !== user.id) return { postError: errorTypes.unauthorizedUser };

  await BlogPost.update({ title, content }, { where: { id } });

  const editedPost = await BlogPost.findByPk(
    id,
    { 
      attributes: { exclude: ['id', 'published', 'updated'] },
      include: { model: Category, as: 'categories', through: { attributes: [] } },
    },
    );

  return { editedPost };
};
