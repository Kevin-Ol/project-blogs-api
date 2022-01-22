const { User } = require('../../sequelize/models');

module.exports = async () => {
  const users = await User.findAll();

  return users;
};
