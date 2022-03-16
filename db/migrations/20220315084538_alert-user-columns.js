/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.alterTable('users', (t) => {
    t.dropColumn('id');
  });

  await knex.schema.alterTable('users', (t) => {
    t.uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('bio');
    t.enu('gender', ['male', 'female', 'other']);
  });

  return;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('users', (t) => {
    t.dropColumn('id');
  });
  const isBioExist = await knex.schema.hasColumn('users', 'bio');
  if (isBioExist) {
    await knex.schema.table('users', (t) => {
      t.dropColumn('bio');
    });
  }
  const isGenderExist = await knex.schema.hasColumn('users', 'gender');
  if (isGenderExist) {
    await knex.schema.table('users', (t) => {
      t.dropColumn('gender');
    });
  }
  return knex.schema.table('users', (t) => {
    t.increments('id').primary().unsigned();
  });
};
