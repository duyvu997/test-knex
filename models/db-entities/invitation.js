'use strict';

const createGuts = require('../model-guts');

const name = 'Invitation';
const tableName = 'invitations';
const selectableProps = [
  'id',
  'trip_id',
  'exprired_at',
  'status',
  'updated_at',
  'updated_by',
  'created_at',
  'created_by',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const getById = async (id) => {
    const [invitation] = await knex
      .table('invitations')
      .innerJoin('trips', 'invitations.trip_id', '=', 'trips.id')
      .where({ 'invitations.id': id });
    if (!invitation) {
      return null;
    }

    const [plan] = await knex.table('plans').where({ id: invitation.plan_id });

    return {
      ...invitation,
      introduction: plan.introduction,
      disclaimers: plan.disclaimers,
      heading: plan.heading,
      volunteer_activites:
        plan.volunteer_activities && JSON.parse(plan.volunteer_activities),
      tourism_activites:
        plan.tourism_activites && JSON.parse(plan.tourism_activites),
      location: plan.location && JSON.parse(plan.location),
      prices: plan.prices && JSON.parse(plan.prices),
      schedule: plan.schedule && JSON.parse(plan.schedule),
      accommodation: plan.accommodation && JSON.parse(plan.accommodation),
      hosts: plan.hosts && JSON.parse(plan.hosts),
      conversation_id: 1,
    };
  };

  return {
    ...guts,
    getById,
  };
};
