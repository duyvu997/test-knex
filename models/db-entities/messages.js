'use strict';

const createGuts = require('../model-guts');

const name = 'Message';
const tableName = 'messages';
const selectableProps = [
  'id',
  'conversation_id',
  'content',
  'type',
  'sender',
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
