const { Plan } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');
const res = require('express/lib/response');

const getById = async (planId) => {
  const plan = await Plan.findOne({ id: planId });
  if (!plan) {
    throw createError(NOT_FOUND, 'plan not found');
  }

  const parsedLocation = JSON.parse(plan.location || '');
  const parsedVolunteer = JSON.parse(plan.volunteer || '');
  const parsedPrices = JSON.parse(plan.prices || '');

  return {
    ...plan,
    location: parsedLocation,
    volunteer: parsedVolunteer,
    prices: parsedPrices,
  };
};

const create = async (planProperties) => {
  const {
    heading,
    location,
    introduction,
    volunteer,
    prices,
    preparing,
    villageId,
  } = planProperties;

  const parsedLocation = location && JSON.stringify(location);
  const parsedVolunteer = location && JSON.stringify(volunteer);
  const parsedPrices = location && JSON.stringify(prices);

  const result = await Plan.create({
    village_id: villageId,
    heading,
    location: parsedLocation,
    introduction,
    volunteer: parsedVolunteer,
    prices: parsedPrices,
    status: 'open',
    preparing,
  });

  console.log(result);
  return result;
};

module.exports = {
  getById,
  create,
};
