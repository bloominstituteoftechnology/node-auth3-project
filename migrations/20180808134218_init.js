
exports.up = function(knex, Promise) {
  return Promise.all([    
    knex.schema.createTable('user', tbl => {
      tbl.increments('id').primary()
      tbl.string('username').notNullable()
      tbl.string('password').notNullable()
      tbl.string('department').notNullable()
      tbl.timestamp('create_at').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user')
  ]) 
};
