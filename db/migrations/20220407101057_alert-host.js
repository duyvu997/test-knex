/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('hosts', (t) => {
    t.uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('job_title');
    t.string('name');
    t.string('avatar');
    t.string('phone');
    t.string('address');
    t.string('bio');
    t.string('age');
    t.integer('village_id');
    t.foreign('village_id')
      .references('id')
      .inTable('villages')
      .onDelete('cascade');
    t.enu('gender', ['male', 'female', 'other']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('hosts');
};
