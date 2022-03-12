const { generateToken } = require('../../middlewares/authentication');
const { User } = require('../../models');
const { createError } = require('../../common/error-utils');

const login = async (username, password) => {
  const user = await User.getAndVerify(username, password);
  const token = generateToken({ userId: user.id, role: user.role });
  delete user.password;

  return { ...user, token };
};

const register = async () => {
  const result = await User.create({ username, email, password, role });

  const token = generateToken({
    userId: result[0].id,
    role: result[0].role,
  });

  const user = result[0];
  delete user.password;

  return { ...user, token };
};

const update = async (
  id,
  { hometown, college, lifestyle, datingStandard: teammates, photos }
) => {
  if (lifestyle && !Array.isArray(lifestyle)) {
    throw createError(400, 'lifestyle must be a array');
  }

  if (photos && !Array.isArray(photos)) {
    throw createError(400, 'photos must be a array');
  }

  if (teammates && !Array.isArray(teammates)) {
    throw createError(400, 'datingStandard must be a array');
  }

  const result = await User.update(id, {
    hometown,
    college,
    lifestyle,
    teammates,
    photos,
  });

  delete result[0].password;

  return result[0];
};

const getById = async () => {};

const getMe = async () => {};

const deleteUser = async () => {};

module.exports = {
  login,
  register,
  update,
  getById,
  getMe,
  deleteUser,
};
