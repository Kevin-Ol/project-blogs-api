const { User } = require('../../sequelize/models');
const { errorTypes, tokenGenerator } = require('../../utils');

module.exports = async ({ email, password }) => {
  const userRegistered = await User.findOne({ where: { email, password } });

  if (!userRegistered) return { loginError: errorTypes.invalidUser };

  const { password: p, ...userWithoutPassword } = userRegistered.dataValues;
  return { token: tokenGenerator({ ...userWithoutPassword }) };
};
