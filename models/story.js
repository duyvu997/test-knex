'use strict';

const createGuts = require('./model-guts');

const name = 'Story';
const tableName = 'stories';
const selectableProps = [
  'id',
  'trip_id',
  'publisher',
  'published_at',
  'background',
  'photos',
  'contents',
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const getByUserById = (userId) => {
    // why need to clone ? because need to specific which id will be selected. stories.id or users.id
    const cloneSelectableProps = selectableProps.map(
      (prop) => 'stories.' + prop
    );

    return knex('stories')
      .select([...cloneSelectableProps, 'users.name', 'users.photos as user_photos'])
      .where({ 'stories.publisher': userId })
      .join('users', 'stories.publisher', 'users.id');
  };

  return {
    ...guts,
    getByUserById,
  };
};
