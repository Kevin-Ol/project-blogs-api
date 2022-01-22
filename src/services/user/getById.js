const { User } = require('../../sequelize/models');
const { errorTypes } = require('../../utils');

module.exports = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return { userError: errorTypes.userNotFound };

  return { user };
};
