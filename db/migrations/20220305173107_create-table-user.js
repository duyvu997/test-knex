/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary().unsigned();
    t.string('username').unique().index();
    t.string('password');
    t.string('email').unique().index();
    t.string('hometown');
    t.string('college');
    t.integer('age');
    t.enum('role', ['admin', 'manager', 'none']);
    t.specificType('following', 'text ARRAY');
    t.specificType('followers', 'text ARRAY');
    t.specificType('teammates', 'text ARRAY');
    t.specificType('lifestyle', 'text ARRAY');
    t.specificType('photos', 'text ARRAY');
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
  return knex.schema.dropTable('users');
};
