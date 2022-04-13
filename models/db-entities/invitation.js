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
    const [user] = await knex
      .table('users')
      .where({ id: invitation.created_by });

    const [conversation] = await knex
      .table('conversations')
      .where({ trip_id: invitation.trip_id });

    return {
      ...invitation,
      members: (invitation.members && JSON.parse(invitation.members)) || '',
      id,
      introduction: plan.introduction,
      disclaimers: plan.disclaimers,
      heading: plan.heading || '',
      background: plan.background || '',
      volunteer_activites:
        (plan.volunteer_activities && JSON.parse(plan.volunteer_activities)) ||
        '',
      tourism_activities:
        (plan.tourism_activities && JSON.parse(plan.tourism_activities)) || '',
      location: (plan.location && JSON.parse(plan.location)) || '',
      prices: (plan.prices && JSON.parse(plan.prices)) || '',
      schedules: (plan.schedules && JSON.parse(plan.schedules)) || '',
      accommodation: plan.accommodation || [],
      hosts: plan.hosts && JSON.parse(plan.hosts),
      created_by: user,
      plan_photos: plan.photos || [],
      plan_prepare: plan.preparing || [],
      conversation_id: (conversation && conversation.id) || '',
    };
  };

  const findAll = async () => {
    const invitations = await knex
      .table('invitations')
      .innerJoin('trips', 'invitations.trip_id', '=', 'trips.id')
      .select('invitations.id');
    const result = [];
    let chain = Promise.resolve();
    invitations.forEach((invitation) => {
      chain = chain.then(async () => {
        const abc = await getById(invitation.id);
        result.push(abc);
      });
    });
    await chain;

    return result;
  };

  const create = (props) => {
    return knex
      .insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(1000);
  };

  return {
    ...guts,
    getById,
    create,
    findAll,
  };
};
