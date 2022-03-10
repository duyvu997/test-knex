const { User } = require('../../models');

const getUsers = (req, res, next) => {
  User.findAll()
    .then((users) =>
      res.json({
        ok: true,
        message: 'Users found',
        users,
      })
    )
    .catch(next);
};

const login = async (req, res, next) => {
  const { username, password } = req.body || {};
  const result = await User.login(username, password);

  return res.status(200).send(result);
};

const register = async (req, res, next) => {
  const { username, email, password, role = 'none' } = req.body || {};
  const result = await User.create({ username, email, password, role });

  return res
    .status(201)
    .send({ ok: true, message: 'created', user: result[0] });
};

module.exports = { getUsers, login, register };
