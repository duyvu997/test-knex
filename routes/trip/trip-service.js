const { Plan } = require('../../models');
const trip = require('./trips.json');
const getById = async (planId) => {
  return trip.trips[0];
};

module.exports = {
  getById,
};
