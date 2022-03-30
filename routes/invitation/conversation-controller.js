const controllerService = require('./conversation-service');

const getAllMessages = async (req, res) => {
  const conversationId = req.params.conversationId;

  const result = await controllerService.getConversationMessages(
    conversationId
  );

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

const getById = async (req, res) => {
  const conversationId = req.params.conversationId;
  const result = await controllerService.getById(conversationId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = { getAllMessages, getById };
