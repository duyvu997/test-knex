'use strict';

const createGuts = require('../model-guts');

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
  
  const create = (props) => {
    return knex
      .insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(1000);
  };

  return {
    ...guts,
    create,
  };
};
