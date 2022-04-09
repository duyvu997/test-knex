/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('trips', (t) => {
    t.dropColumn('members');
  });

  return knex.schema.alterTable('trips', (t) => {
    t.text('members');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('trips', (t) => {
    t.dropColumn('members');
  });

  return knex.schema.alterTable('trips', (t) => {
    t.specificType('members', 'text ARRAY');
  });
};
