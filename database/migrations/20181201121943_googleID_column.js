
exports.up = function(knex, Promise) {
  return knex.schema.table('google-users', (tbl)=>{
      tbl.integer('googleID')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('google-users', (tbl)=>{
        tbl.dropColumn('googleID')
    })
};
