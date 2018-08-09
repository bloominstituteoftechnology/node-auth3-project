
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        tbl.increments();
    
        tbl.string('username')
        .notNullable()
        .unique();
        tbl.string('password')
        .notNullable();
    
        tbl.string('department')
        .notNullable()
        .defaultTo('admin');
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
