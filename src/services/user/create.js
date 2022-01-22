const { User } = require('../../sequelize/models');
const { errorTypes, tokenGenerator } = require('../../utils');

module.exports = async (newUser) => {
  const userRegistered = await User.findOne({ where: { email: newUser.email } });

  if (userRegistered) return errorTypes.userRegistered;

  const user = await User.create({ ...newUser });

  const { password: p, ...userWithoutPassword } = user.dataValues;

  return tokenGenerator(userWithoutPassword);
};
