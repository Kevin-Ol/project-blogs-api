const { User } = require('../../sequelize/models');

module.exports = async (user) => {
  await User.destroy({ where: { id: user.id } });
};
