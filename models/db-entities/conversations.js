'use strict';

const createGuts = require('../model-guts');

const name = 'Conversation';
const tableName = 'conversations';
const selectableProps = [
  'id',
  'trip_id',
  'title',
  'members',
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
