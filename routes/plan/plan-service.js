const { Plan, Trip, Conversation, Host } = require('../../models');
const { createError, NOT_FOUND } = require('../../common/error-utils');
const cuid = require('cuid');
const userService = require('../user/user-service');
const villageService = require('../village/village-service');

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const getHostFromActivities = async (
  volunteer_activities,
  tourism_activities
) => {
  const hostAsArray = [];
  if (volunteer_activities) {
    const hosts = volunteer_activities.map((activity) => activity.host);
    hostAsArray.push(hosts);
  }
  if (tourism_activities) {
    const hosts = tourism_activities.map((activity) => activity.host);
    hostAsArray.push(hosts);
  }

  return Host.findIn(hostAsArray.filter(onlyUnique));
};

const getById = async (planId) => {
  return Plan.findOne({ id: planId });
};

const create = async (planProperties) => {
  const { villageId, volunteer_activities, tourism_activities } =
    planProperties;

  await villageService.getById(villageId);

  const hosts = await getHostFromActivities(
    volunteer_activities,
    tourism_activities
  );

  return Plan.create({
    ...planProperties,
    hosts,
  });
};

const update = async (planId, planProperties) => {
  const { volunteer_activities, tourism_activities } = planProperties;

  await Plan.findOne({ id: planId });

  const hosts = await getHostFromActivities(
    volunteer_activities,
    tourism_activities
  );

  return Plan.update(planId, {
    ...planProperties,
    hosts,
  });
};

const getAll = async () => {
  return Plan.find({});
};

const initTrip = async (planId, user, tripData) => {
  const { from_date, to_date, maximum_member } = tripData;
  const id = cuid();
  const userSaved = await userService.getById(user.userId, user.userId);

  const [trip] = await Trip.create({
    id,
    plan_id: planId,
    created_by: user.userId,
    status: 'open',
    from_date,
    to_date,
    members: JSON.stringify([userSaved]),
    maximum_member,
  });

  await Conversation.create({
    id: cuid(),
    trip_id: trip.id,
    title: `trip_${trip.id}`,
    members: [
      JSON.stringify({
        name: userSaved.name,
        username: userSaved.username,
        avatar: userSaved.avatar,
        id: userSaved.id,
      }),
    ],
  });

  return trip;
};

module.exports = {
  getById,
  create,
  update,
  getAll,
  initTrip,
};
