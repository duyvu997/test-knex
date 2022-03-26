/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('conversations', (t) => {
    t.increments('id').primary().unsigned();
    t.integer('trip_id');
    t.foreign('trip_id').references('id').inTable('trips').onDelete('cascade');
    t.string('title');
    t.specificType('members', 'text ARRAY');
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
  return knex.schema.dropTable('conversations');
};
