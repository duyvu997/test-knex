/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('stories', (t) => {
    t.increments('id').primary().unsigned();
    t.integer('trip_id');
    t.foreign('trip_id').references('id').inTable('trips').onDelete('cascade');
    t.specificType('photos', 'text ARRAY');
    t.string('background');
    t.string('title');
    t.string('contents');
    t.timestamp('published_at').defaultTo(knex.fn.now());
    t.string('publisher');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('stories');
};
