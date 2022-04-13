/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('conversations', (t) => {
    t.dropColumn('trip_id');
  });

  return knex.schema.alterTable('conversations', (t) => {
    t.string('trip_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('conversations', (t) => {
    t.dropColumn('trip_id');
  });

  return knex.schema.alterTable('conversations', (t) => {
    t.integer('trip_id');
  });
};
