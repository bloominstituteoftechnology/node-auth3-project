
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table
            .string('user_name', 128)
            .notNullable();
  
        table
            .string('password', 128)
            .notNullable();

        table
            .string('department', 128)
            .notNullable();
            
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };