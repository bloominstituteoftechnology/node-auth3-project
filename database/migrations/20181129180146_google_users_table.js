
exports.up = function(knex, Promise) {
  return knex.schema.createTable('google-users', (tbl)=>{
      tbl.increments()
      tbl.string('username')
      tbl.integer('googleID')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('google-users')
};
