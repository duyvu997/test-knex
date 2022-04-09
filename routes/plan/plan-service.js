const { Plan, Trip } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');
const cuid = require('cuid');
const userService = require('../user/user-service');

const getById = async (planId) => {
  const plan = await Plan.findOne({ id: planId });
  if (!plan) {
    throw createError(NOT_FOUND, 'plan not found');
  }

  const parsedLocation = plan.location && JSON.parse(plan.location || '');
  const parsedVolunteer =
    plan.volunteer_activities && JSON.parse(plan.volunteer_activities || '');
  const parsedPrices = plan.prices && JSON.parse(plan.prices || '');

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
    background,
  } = planProperties;
  // todo: find by village.

  const parsedLocation = location && JSON.stringify(location);
  const parsedVolunteer = location && JSON.stringify(volunteer_activities);
  const parsedPrices = location && JSON.stringify(prices);

  return Plan.create({
    village_id: villageId,
    heading,
    location: parsedLocation,
    introduction,
    volunteer_activities: parsedVolunteer,
    prices: parsedPrices,
    status: 'open',
    preparing,
    background,
  });
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
    background,
  } = planProperties;
  // todo: find by village.
  const parsedLocation = location && JSON.stringify(location);
  const parsedVolunteer =
    volunteer_activities && JSON.stringify(volunteer_activities);
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
    background,
  });
};

const createTrip = async (planId, user, tripData) => {
  const { from_date, to_date, maximum_member } = tripData;
  const id = cuid();
  const userSaved = await userService.getById(user.userId, user.userId);

  return Trip.create({
    id,
    plan_id: planId,
    created_by: user.userId,
    status: 'open',
    from_date,
    to_date,
    members: JSON.stringify(userSaved),
    maximum_member,
  });
};

module.exports = {
  getById,
  create,
  getAll,
  update,
  createTrip,
};
