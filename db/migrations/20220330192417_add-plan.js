/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('plans', (t) => {
    t.increments('id').primary().unsigned();
    t.integer('village_id');
    t.foreign('village_id')
      .references('id')
      .inTable('villages')
      .onDelete('cascade');
    t.string('heading');
    t.string('introduction');
    t.string('location');
    t.string('volunteer');
    t.string('prices');
    t.specificType('preparing', 'text ARRAY');
    t.enum('status', ['open', 'delete']);
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
  return knex.schema.dropTable('plans');
};
