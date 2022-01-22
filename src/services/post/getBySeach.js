const Sequelize = require('sequelize');
const { BlogPost, User, Category } = require('../../sequelize/models');

const { Op } = Sequelize;

module.exports = async (searchTerm) => {
  const posts = await BlogPost.findAll(
    { 
      where: { 
        [Op.or]: [
          { title: { [Op.substring]: searchTerm } },
          { content: { [Op.substring]: searchTerm } },
        ],
       },
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

  return posts;
};
