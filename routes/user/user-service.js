const { User } = require('../../models');
const { generateToken } = require('../../middlewares/authentication');
const { createError, NOT_FOUND } = require('../../common/error-utils');

const login = async (username, password) => {
  if (!username) {
    throw createError(400, 'missing username');
  }
  if (!password) {
    throw createError(400, 'missing password');
  }

  const user = await User.getAndVerify(username, password);
  const token = generateToken({ userId: user.id, role: user.role });
  delete user.password;

  return { ...user, token };
};

const register = async ({ username, email, password, role }) => {
  if (!username) {
    throw createError(400, 'missing username');
  }
  if (!email) {
    throw createError(400, 'missing email');
  }
  if (!password) {
    throw createError(400, 'missing password');
  }

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
  { hometown, college, lifestyle, datingStandard, photos }
) => {
  if (lifestyle && !Array.isArray(lifestyle)) {
    throw createError(400, 'lifestyle must be a array');
  }

  if (photos && !Array.isArray(photos)) {
    throw createError(400, 'photos must be a array');
  }

  if (datingStandard && !Array.isArray(datingStandard)) {
    throw createError(400, 'datingStandard must be a array');
  }

  const result = await User.update(id, {
    hometown,
    college,
    lifestyle,
    dating_standard: datingStandard,
    photos,
  });

  delete result[0].password;

  return result[0];
};

const getById = async (caller, targetUser) => {
  const user =
    Number(caller) === Number(targetUser)
      ? await getMe(caller)
      : await getOtherUserById(targetUser);

  if (!user) {
    throw createError(NOT_FOUND, 'user not found');
  }

  user.achievements = [
    {
      iconUrl: 'http://localhost:3000/test-url',
      collectedAt: '2022-03-12T07:05:29.940Z',
      title: 'King of the hills',
      conntent: '20 mountains',
    },
    {
      iconUrl: 'http://localhost:3000/test-url',
      collectedAt: '2022-03-13T07:05:29.940Z',
      title: 'Rosette',
      conntent: '10 villages',
    },
  ];

  return user;
};

// --------- support funcs -----------

const getMe = async (userId) => {
  return User.findOne({ id: userId });
};

const getOtherUserById = async (userId) => {};

const deleteUser = async () => {};

module.exports = {
  login,
  register,
  update,
  getById,
  getMe,
  deleteUser,
};
