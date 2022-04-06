'use strict';

const createGuts = require('./model-guts');

const name = 'Plan';
const tableName = 'plans';
const selectableProps = [
  'id',
  'village_id',
  'heading',
  'location',
  'introduction',
  'volunteer_activities',
  'tourism_activites',
  'prices',
  'preparing',
  'status',
  'hosts',
  'stars',
  'updated_at',
  'created_at',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...guts,
  };
};
