const userService = require('./user-service');

const login = async (req, res) => {
  const { username, password } = req.body || {};
  const user = await userService.login(username, password);

  return res.status(200).send({ ok: true, message: 'succeed', user });
};

const register = async (req, res) => {
  const { username, email, password, role = 'none' } = req.body || {};
  const user = await userService.register({ username, email, password, role });

  return res.status(201).send({ ok: true, message: 'created', user });
};

const update = async (req, res) => {
  const props = req.body || {};
  const requestUser = req.decodedUser;

  const user = await userService.update(requestUser.userId, props);

  return res.status(200).send({ ok: true, message: 'succeed', user });
};

module.exports = { login, register, update };
