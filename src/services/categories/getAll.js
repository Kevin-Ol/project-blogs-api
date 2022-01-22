const { Category } = require('../../sequelize/models');

module.exports = async () => {
  const categories = await Category.findAll();

  return categories;
};
