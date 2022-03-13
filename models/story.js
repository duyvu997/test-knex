'use strict';

const createGuts = require('./model-guts');

const name = 'Story';
const tableName = 'stories';
const selectableProps = [
  'id',
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
