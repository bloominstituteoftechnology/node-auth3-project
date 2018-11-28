
exports.up = function(knex, Promise) {
  return knex.schema.table('users', (tbl)=>{
    tbl.string('department')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users').dropColumn('department')
};
