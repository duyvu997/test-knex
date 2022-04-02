const tripService = require('./trip-service');

const getById = async (req, res) => {
  const tripId = req.params.tripId;
  const result = await tripService.getById(tripId);

  return res.status(200).send({ ok: true, message: 'ok', data: result });
};

module.exports = { getById };
