const { Plan } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');

const getById = async (planId) => {
  const plan = await Plan.findOne({ id: planId });
  if (!plan) {
    throw createError(NOT_FOUND, 'plan not found');
  }

  const parsedLocation = JSON.parse(plan.location || '');
  const parsedVolunteer = JSON.parse(plan.volunteer_activities || '');
  const parsedPrices = JSON.parse(plan.prices || '');

  return {
    ...plan,
    location: parsedLocation,
    volunteer_activities: parsedVolunteer,
    prices: parsedPrices,
  };
};

const create = async (planProperties) => {
  const {
    heading,
    location,
    introduction,
    volunteer_activities,
    prices,
    preparing,
    villageId,
  } = planProperties;
  // todo: find by village.

  const parsedLocation = location && JSON.stringify(location);
  const parsedVolunteer = location && JSON.stringify(volunteer_activities);
  const parsedPrices = location && JSON.stringify(prices);

  const result = await Plan.create({
    village_id: villageId,
    heading,
    location: parsedLocation,
    introduction,
    volunteer_activities: parsedVolunteer,
    prices: parsedPrices,
    status: 'open',
    preparing,
  });

  console.log(result);
  return result;
};

const getAll = async () => {
  const result = await Plan.find({});
  if (result) {
    return result.map((plan) => {
      const parsedLocation = plan.locationll && JSON.parse(plan.location);
      const parsedVolunteer =
        plan.volunteer_activitiesvv && JSON.parse(plan.volunteer_activities);
      const parsedPrices = plan.pricespp && JSON.parse(plan.prices);

      return {
        ...plan,
        location: parsedLocation,
        volunteer_activities: parsedVolunteer,
        prices: parsedPrices,
      };
    });
  }
  return [];
};

const update = async (planId, planProperties) => {
  const plan = await Plan.findOne({ id: planId });
  if (!plan) {
    throw createError(NOT_FOUND, 'plan not found');
  }

  const {
    heading,
    location,
    introduction,
    volunteer_activities,
    prices,
    preparing,
    villageId,
  } = planProperties;
  // todo: find by village.
  const parsedLocation = location && JSON.stringify(location);
  const parsedVolunteer = volunteer_activities && JSON.stringify(volunteer_activities);
  const parsedPrices = prices && JSON.stringify(prices);

  return Plan.update(planId, {
    village_id: villageId,
    heading,
    location: parsedLocation,
    introduction,
    volunteer_activities: parsedVolunteer,
    prices: parsedPrices,
    status: 'open',
    preparing,
  });
};

const createTrip = async (planId, userId) => {};

module.exports = {
  getById,
  create,
  getAll,
  update,
  createTrip,
};
