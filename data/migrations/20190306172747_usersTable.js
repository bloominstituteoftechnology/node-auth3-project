
exports.up = function(knex) {
    return knex.schema.createTable('users', function(tbl) {
      tbl.increments();
  
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl.string('department', 128);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  