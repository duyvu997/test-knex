const userService = require('./user-service');
const storyService = require('../story/story-service');

const login = async (req, res) => {
  const { username, password } = req.body || {};
  const user = await userService.login(username, password);

  return res.status(200).send({ ok: true, message: 'succeed', data: user });
};

const register = async (req, res) => {
  const { username, email, password, role = 'none' } = req.body || {};
  const user = await userService.register({ username, email, password, role });

  return res.status(201).send({ ok: true, message: 'created', data: user });
};

const update = async (req, res) => {
  const props = req.body || {};
  const requestUser = req.decodedUser;

  const user = await userService.update(requestUser.userId, props);

  return res.status(200).send({ ok: true, message: 'succeed', data: user });
};

const getById = async (req, res) => {
  const userId = req.params.userId || {};
  const requestUser = req.decodedUser;

  const user = await userService.getById(requestUser.userId, userId);

  return res.status(200).send({ ok: true, message: 'succeed', data: user });
};

const getUserStories = async (req, res) => {
  const userId = req.params.userId || {};
  const requestUser = req.decodedUser;
  const stories = await storyService.getById(requestUser.userId, userId);

  return res.status(200).send({ ok: true, message: 'succeed', data: stories });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();

  return res.status(200).send({ ok: true, message: 'succeed', data: users });
};

module.exports = { login, register, update, getById, getUserStories, getAll };
