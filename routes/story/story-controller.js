const storyService = require('./story-service');

const getById = async (req, res) => {
  const storyId = req.params.storyId;
  const result = await storyService.getStoryDetail(storyId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const create = async (req, res) => {
  const storyData = req.body || {};
  const user = req.decodedUser || {};
  const result = await storyService.create(user, storyData);

  return res.status(201).send({ ok: true, message: 'ok', data: result });
};

const update = async (req, res) => {
  const storyData = req.body || {};
  const storyId = req.params.storyId;
  const user = req.decodedUser || {};
  const result = await storyService.update(user, storyId, storyData);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const getAll = async (req, res) => {
  const result = await storyService.getAll();
  
  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = {
  getById,
  create,
  update,
  getAll,
};
