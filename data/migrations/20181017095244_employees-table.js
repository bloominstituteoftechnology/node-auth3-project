exports.up = function(knex, Promise) {
    return knex.schema.createTable('employees', (tbl) => {
      tbl.increments();
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 256).notNullable();
      tbl.string('department', 512);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('employees');
  };
