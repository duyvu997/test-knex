const { Village } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');

const getById = async (villageId) => {
  const village = await Village.findOne({ id: villageId });
  if (!village) {
    throw createError(NOT_FOUND, 'village not found');
  }

  return village;
};

const create = async (villageData) => {
  return Village.create(villageData);
};

const getAll = async () => {
  const result = await Village.find({});
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
  const plan = await Village.findOne({ id: planId });
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
  const parsedVolunteer =
    volunteer_activities && JSON.stringify(volunteer_activities);
  const parsedPrices = prices && JSON.stringify(prices);

  return Village.update(planId, {
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
