'use strict';

const bcrypt = require('bcrypt');
const { generateToken } = require('../middlewares/authentication');
const createGuts = require('./model-guts');

const name = 'User';
const tableName = 'users';
const selectableProps = [
  'id',
  'username',
  'email',
  'updated_at',
  'created_at',
  'role',
  'password'
];

const SALT_ROUNDS = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const beforeSave = async (user) => {
  if (!user.password) {
    return Promise.resolve(user);
  }

  return hashPassword(user.password)
    .then((hash) => ({ ...user, password: hash }))
    .catch((err) => `Error hashing password: ${err}`);
};

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = (props) => beforeSave(props).then((user) => guts.create(user));

  const verify = async (username, password) => {
    const matchErrorMsg = 'Username or password do not match';
    const user = await guts.findOne({username})

    if (!user) throw matchErrorMsg;

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) throw matchErrorMsg;

    return user;
  };

  const login = async (username, password) => {
    const user = await verify(username, password);
    const token = await generateToken({ userId: user.id, role: user.role });
    return { token, user };
  };

  return {
    ...guts,
    create,
    verify,
    login
  };
};
