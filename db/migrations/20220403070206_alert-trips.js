/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('DROP TABLE trips CASCADE');
  return knex.schema.createTable('trips', (t) => {
    t.string('id').primary();
    t.integer('plan_id');
    t.foreign('plan_id').references('id').inTable('plans').onDelete('cascade');
    t.datetime('from_date');
    t.datetime('to_date');
    t.integer('maximum_member');
    t.enum('status', ['open', 'done', 'inprogress']);
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
  return knex.schema.alterTable('trips', (t) => {
    t.dropColumns([
      'plan_id',
      'from_date',
      'to_date',
      'maximum_member',
      'status',
      'members',
      'created_at',
      'updated_at',
      'created_by',
      'updated_by',
    ]);
  });
};
