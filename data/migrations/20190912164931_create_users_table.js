
exports.up = function(knex) {
    return knex.schema.createTable('users', (users) => {
        users.increments();
        users.text('username', 128).notNullable().unique();
        users.text('password', 128).notNullable()
        users.text('department', 128).notNullable()
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableifExists('users');
  };