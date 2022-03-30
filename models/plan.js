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
  'volunteer',
  'prices',
  'preparing',
  'status',
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
