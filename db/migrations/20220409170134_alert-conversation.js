/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.dropTable('conversations');

  return knex.schema.createTable('conversations', (t) => {
    t.string('id').primary().unsigned();
    t.string('trip_id');
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
exports.down = async (knex) => {
  await knex.schema.dropTable('conversations');

  return knex.schema.createTable('conversations', (t) => {
    t.increments('id').primary().unsigned();
    t.string('trip_id');
    t.foreign('trip_id').references('id').inTable('trips').onDelete('cascade');
    t.string('title');
    t.specificType('members', 'text ARRAY');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.string('created_by');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.string('updated_by');
  });
};
