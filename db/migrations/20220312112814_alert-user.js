/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('users', (t) => {
    t.renameColumn('teammates', 'dating_standard');
    t.enu('onboard_status', ['pending', 'in_progres', 'done']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('users', (t) => {
    t.dropColumn('onboard_status');
    t.renameColumn('dating_standard', 'teammates');
  });
};
