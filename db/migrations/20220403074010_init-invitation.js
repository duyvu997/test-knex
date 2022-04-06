/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invitations', (t) => {
    t.string('id').primary();
    t.string('trip_id');
    t.foreign('trip_id').references('id').inTable('trips').onDelete('cascade');
    t.enum('status', ['open', 'close']);
    t.datetime('exprired_at');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.string('created_by');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.string('updated_by');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('invitations');
};
