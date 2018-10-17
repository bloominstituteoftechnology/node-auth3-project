
exports.up = function(knex, Promise) {
  return knex.schema.table('usrs', function(tbl) {
    tbl.string('usrs_dpt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('usrs', function(tbl) {
      tbl.dropColumn('usrs_dpt');
  });
};
