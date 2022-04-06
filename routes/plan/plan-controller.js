const planService = require('./plan-service');

const create = async (req, res) => {
  const planProperties = req.body || {};

  const result = await planService.create(planProperties);

  return res.status(201).send({ ok: true, message: 'ok', data: result });
};

const getById = async (req, res) => {
  const planId = req.params.planId;
  const result = await planService.getById(planId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const update = async (req, res) => {
  const planId = req.params.planId;
  const planProperties = req.body;
  const result = await planService.update(planId, planProperties);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const deletePlan = async (req, res) => {
  const conversationId = req.params.conversationId;
  const result = await planService.getById(conversationId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const getAll = async (req, res) => {
  const result = await planService.getAll();

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const initTrip = async (req, res) => {
  const planId = req.params.planId;
  const decodedUser = req.decodedUser;
  const result = await planService.createTrip(planId, decodedUser.id);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = { create, getById, update, deletePlan, getAll, initTrip };
