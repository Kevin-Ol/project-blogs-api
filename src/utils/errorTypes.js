const { StatusCodes } = require('http-status-codes');

module.exports = {
  userRegistered: {
    code: StatusCodes.CONFLICT,
    message: 'User already registered',
  },
  invalidUser: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Invalid fields',
  },
  missingJWT: {
    code: StatusCodes.UNAUTHORIZED,
    message: 'Token not found',
  },
  invalidJWT: {
    code: StatusCodes.UNAUTHORIZED,
    message: 'Expired or invalid token',
  },
  userNotFound: {
    code: StatusCodes.NOT_FOUND,
    message: 'User does not exist',
  },
  categoryNotFound: {
    code: StatusCodes.BAD_REQUEST,
    message: '"categoryIds" not found',
  },
  postNotFound: {
    code: StatusCodes.NOT_FOUND,
    message: 'Post does not exist',
  },
  categoriesCannotBeEdited: {
    code: StatusCodes.BAD_REQUEST,
    message: 'Categories cannot be edited',
  },
  unauthorizedUser: {
    code: StatusCodes.UNAUTHORIZED,
    message: 'Unauthorized user',
  },
};
