
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(tbl){
    tbl.string('department', 40) }
  )
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(tbl){
      tbl.dropColumn('department')
  })
};
