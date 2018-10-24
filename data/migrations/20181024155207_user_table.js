
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl){
        tbl.increments().unique().unsigned()
        tbl.string('username').unique()
        tbl.string('password')
        tbl.string('department')
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('users')
};
