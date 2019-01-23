
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users.string('username', 25).notNullable().unique();
        users.string('password', 16).notNullable();
        users.string('department', 25);
    })
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
