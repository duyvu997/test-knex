const villageService = require('./village-service');

const create = async (req, res) => {
  const villageData = req.body || {};
  const result = await villageService.create(villageData);

  return res.status(201).send({ ok: true, message: 'ok', data: result });
};

const getById = async (req, res) => {
  const villageId = req.params.villageId;
  console.log(villageId);
  const result = await villageService.getById(villageId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const update = async (req, res) => {
  const villageId = req.params.villageId;
  const villageData = req.body;
  const result = await villageService.update(villageId, villageData);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const deleteVillage = async (req, res) => {
  return res.status(200).send({ ok: true, message: 'ok', data: {} });
};

const getAll = async (req, res) => {
  const result = await villageService.getAll();

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = { create, getById, update, deleteVillage, getAll };
