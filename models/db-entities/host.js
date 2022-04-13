'use strict';

const createGuts = require('../model-guts');

const name = 'Host';
const tableName = 'hosts';
const selectableProps = [
  'id',
  'job_title',
  'name',
  'avatar',
  'age',
  'village_id',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const findIn = async (ids) => {
    return knex.select(selectableProps).from('hosts').whereIn('id', ids);
  };

  return {
    ...guts,
    findIn,
  };
};
