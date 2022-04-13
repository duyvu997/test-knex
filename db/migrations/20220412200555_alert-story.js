/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =  function (knex) {
  return knex.schema.alterTable('stories', (t) => {
    t.string('village_name');
    t.string('location');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('stories', (t) => {
    t.dropColumn('village_name');
    t.dropColumn('location');
  });

  
};
