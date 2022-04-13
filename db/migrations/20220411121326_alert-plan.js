/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('plans', (t) => {
    t.renameColumn('tourism_activites', 'tourism_activities');
    t.specificType('disclaimers', 'text ARRAY');
    t.specificType('photos', 'text ARRAY');
    t.specificType('accommodation', 'text ARRAY');
    t.text('schedules');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.alterTable('plans', (t) => {
    t.renameColumn('tourism_activities', 'tourism_activites');
    t.dropColumn('photos');
    t.dropColumn('accommodation');
    t.dropColumn('disclaimers');
    t.dropColumn('schedules');
  });
};
