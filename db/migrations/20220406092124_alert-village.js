/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('villages', (t) => {
    t.text('name');
    t.text('location');
    t.specificType('photos', 'text ARRAY');
    t.specificType('managers', 'text ARRAY');
    t.text('introduction');
    t.text('population');
    t.text('topography');
    t.text('seasons');
    t.text('folklore');
    t.text('building');
    t.text('history');
    t.text('natural');
    t.text('traffic');
    t.text('celebrarity');
    t.text('traditional_craftsmen');
    t.text('foodset');
    t.text('problems');
    t.text('background');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('villages', (t) => {
    t.dropColumn('name');
    t.dropColumn('location');
    t.dropColumn('photos');
    t.dropColumn('managers');
    t.dropColumn('introduction');
    t.dropColumn('population');
    t.dropColumn('topography');
    t.dropColumn('seasons');
    t.dropColumn('folklore');
    t.dropColumn('building');
    t.dropColumn('history');
    t.dropColumn('natural');
    t.dropColumn('traffic');
    t.dropColumn('celebrarity');
    t.dropColumn('traditional_craftsmen');
    t.dropColumn('foodset');
    t.dropColumn('problems');
    t.dropColumn('background');
  });
};
