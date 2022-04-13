'use strict';

const createGuts = require('../model-guts');
const { createError, BAD_REQUEST } = require('../../common/error-utils');

const name = 'Plan';
const tableName = 'plans';
const selectableProps = [
  'id',
  'village_id',
  'background',
  'heading',
  'location',
  'introduction',
  'volunteer_activities',
  'tourism_activities',
  'prices',
  'preparing',
  'schedules',
  'disclaimers',
  'accommodation',
  'status',
  'hosts',
  'stars',
  'photos',
  'updated_at',
  'created_at',
];

const defaultDesclaimers = [
  'Be respectful to the locals ',
  "There may be shortages of water and/or internet, but that's part of the experience ",
  "Don't step into rooms with your shoes on",
];

const defaultAccommodation = [
  'Be respectful to the locals ',
  "There may be shortages of water and/or internet, but that's part of the experience ",
  "Don't step into rooms with your shoes on",
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const beforeSave = (planProperties) => {
    const {
      heading,
      location,
      introduction,
      volunteer_activities,
      tourism_activities,
      prices,
      preparing,
      villageId,
      background,
      schedules,
      photos,
      disclaimers = defaultDesclaimers,
      accommodation = defaultAccommodation,
      hosts,
    } = planProperties;

    const parsedLocation = location && JSON.stringify(location);
    const parsedSchedules = schedules && JSON.stringify(schedules);
    const parsedPrices = location && JSON.stringify(prices);
    const parsedHosts = hosts && JSON.stringify(hosts);
    const parsedVolunteer =
      volunteer_activities && JSON.stringify(volunteer_activities);
    const parsedTourism =
      tourism_activities && JSON.stringify(tourism_activities);

    return {
      photos,
      heading,
      preparing,
      background,
      disclaimers,
      introduction,
      accommodation,
      status: 'open',
      hosts: parsedHosts,
      prices: parsedPrices,
      village_id: villageId,
      location: parsedLocation,
      schedules: parsedSchedules,
      tourism_activities: parsedTourism,
      volunteer_activities: parsedVolunteer,
    };
  };

  const postFind = (plan) => {
    if (!plan) {
      throw createError(NOT_FOUND, 'plan not found');
    }

    const {
      location,
      volunteer_activities,
      tourism_activities,
      prices,
      schedules,
      hosts,
    } = plan;

    if (prices) {
      plan.prices = JSON.parse(prices);
    }

    if (volunteer_activities) {
      plan.volunteer_activities = JSON.parse(volunteer_activities);
    }

    if (tourism_activities) {
      plan.tourism_activities = JSON.parse(tourism_activities);
    }

    if (hosts) {
      plan.hosts = JSON.parse(hosts);
    }

    if (schedules) {
      plan.schedules = JSON.parse(schedules);
    }

    if (location) {
      plan.location = JSON.parse(location);
    }

    return plan;
  };

  const create = (props) => beforeSave(props).then((plan) => guts.create(plan));

  const update = (id, props) =>
    beforeSave(props).then((plan) => guts.update(id, plan));

  const findOne = (filters) =>
    guts.findOne(filters).then((plan) => postFind(plan));

  const find = (filters) =>
    guts.find(filters).then((plans) => {
      const ab = plans.map((plan) => postFind(plan));
      console.log(ab);
      return ab;
    });

  return {
    ...guts,
    create,
    update,
    findOne,
    find,
  };
};
