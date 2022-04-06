const invitationService = require('./invitation-service');

const getById = async (req, res) => {
  const invitationId = req.params.invitationId;
  const result = await invitationService.getById(invitationId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = { getById };
