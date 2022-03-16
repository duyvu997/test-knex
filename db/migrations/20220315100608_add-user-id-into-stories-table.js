/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('stories', (t) => {
    t.dropColumn('publisher');
  });

  await knex.schema.alterTable('users', (t) => {
    t.string('name');
  });

  return knex.schema.table('stories', (t) => {
    t.uuid('publisher');
    t.foreign('publisher')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('users', (t) => {
    t.dropColumn('name');
  });

  const isPublisherExist = await knex.schema.hasColumn('stories', 'publisher');
  if (isPublisherExist) {
    await knex.schema.table('stories', (t) => {
      t.dropColumn('publisher');
    });
  }

  return knex.schema.table('stories', (t) => {
    t.string('publisher');
  });
};
