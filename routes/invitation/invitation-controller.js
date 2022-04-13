const invitationService = require('./invitation-service');

const getById = async (req, res) => {
  const invitationId = req.params.invitationId;
  const result = await invitationService.getById(invitationId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const create = async (req, res) => {
  const invitationData = req.body || {};
  const decodedUser = req.decodedUser;

  const result = await invitationService.create(invitationData, decodedUser);

  return res.status(201).send({ ok: true, message: 'ok', data: result });
};

const getAll = async (req, res) => {

  const result = await invitationService.getAll();

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = { getById, create, getAll };
