
exports.up = function(knex) {
  return knex.schema.createTable('logins', tbl => 
  tbl.increments,
  tbl.text('username').unique().notNullable(),
  tbl.text('password').notNullable(),
  tbl.text('department').unique()
  )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('logins')
};
