/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('stories', (t) => {
    t.dropColumn('contents');
    t.dropColumn('publisher');
  });

  return knex.schema.alterTable('stories', (t) => {
    t.text('sections');
    t.text('publisher');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('stories', (t) => {
    t.dropColumn('sections');
    t.dropColumn('publisher');
  });

  return knex.schema.alterTable('stories', (t) => {
    t.string('contents');
    t.string('publisher');
  });
};
