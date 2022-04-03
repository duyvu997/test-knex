const { User } = require('../../models');
const { generateToken } = require('../../middlewares/authentication');
const {
  createError,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../../common/error-utils');

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

  let user = await User.findOne((builder) =>
    builder.where({ username }).orWhere({ email })
  );

  if (user) {
    throw createError(400, 'username or email already exist');
  }
  const result = await User.create({ username, email, password, role });

  const token = generateToken({
    userId: result[0].id,
    role: result[0].role,
  });

  user = result[0];
  delete user.password;

  return { ...user, token };
};

const update = async (
  id,
  {
    hometown,
    college,
    lifestyle,
    datingStandard,
    photos,
    bio,
    name,
    age,
    gender,
  }
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

  if (gender && !['male', 'female', 'other'].includes(gender)) {
    throw createError(400, `gender: [ male, female, other ]`);
  }

  const result = await User.update(id, {
    hometown,
    college,
    lifestyle,
    dating_standard: datingStandard,
    photos,
    bio,
    name,
    gender,
    age,
  });

  delete result[0].password;

  return result[0];
};

const getById = async (caller, targetUser) => {
  if (!caller || !targetUser) {
    throw createError(BAD_REQUEST, 'invalid user');
  }

  const user =
    String(caller) === String(targetUser)
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

const findAllUserIn = async (userIds) => {
  return User.find((builder) => builder.whereIn('id', userIds));
};

// --------- support funcs -----------

const getMe = async (userId) => {
  return User.findOne({ id: userId });
};

const getOtherUserById = async (userId) => {};

const deleteUser = async () => {};

const getAll = async () => {
  return User.findAll({});
};

module.exports = {
  login,
  register,
  update,
  getById,
  getMe,
  deleteUser,
  findAllUserIn,
  getAll,
};
