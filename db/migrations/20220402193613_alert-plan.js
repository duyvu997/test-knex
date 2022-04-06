/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('plans', (t) => {
    t.renameColumn('volunteer', 'volunteer_activities');
    t.text('tourism_activites');
    t.text('hosts');
    t.integer('stars');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.alterTable('plans', (t) => {
    t.renameColumn('volunteer_activities', 'volunteer');
    t.dropColumn('tourism_activites');
    t.dropColumn('hosts');
    t.dropColumn('stars');
  });
};
