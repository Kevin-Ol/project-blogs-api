const { Category } = require('../../sequelize/models');

module.exports = async (name) => {
  const category = await Category.create({ name });

  return category;
};
