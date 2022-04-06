'use strict';

const createGuts = require('./model-guts');

const name = 'Trip';
const tableName = 'trips';
const selectableProps = [
  'id',
  'plan_id',
  'from_date',
  'to_date',
  'maximum_member',
  'status',
  'members',
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

  return {
    ...guts,
  };
};
