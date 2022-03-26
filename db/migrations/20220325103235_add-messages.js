/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', (t) => {
    t.increments('id').primary().unsigned();
    t.integer('conversation_id');
    t.foreign('conversation_id')
      .references('id')
      .inTable('trips')
      .onDelete('cascade');
    t.string('content');
    t.string('sender');
    t.enum('type', ['text', 'image', 'video']);
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
  return knex.schema.dropTable('messages');
};
