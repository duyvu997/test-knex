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

const update = async (villageId, villageData) => {
  const village = await Village.findOne({ id: villageId });

  if (!village) {
    throw createError(NOT_FOUND, 'plan not found');
  }
  const {
    population,
    topography,
    seasons,
    folklore,
    building,
    history,
    natural,
    traffic,
    celebrarity,
    traditional_craftsmen,
    foodset,
    problems,
  } = villageData;

  return Village.update(villageId, {
    population,
    topography,
    seasons,
    folklore,
    building,
    history,
    natural,
    traffic,
    celebrarity,
    traditional_craftsmen,
    foodset,
    problems,
  });
};

module.exports = {
  getById,
  create,
  getAll,
  update,
};
