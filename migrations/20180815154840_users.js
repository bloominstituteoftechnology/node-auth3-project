exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users.string('username').notNullable().unique();
    users.string('password').notNullable();
    users.string('department');
  });
};

exports.down = function(knex, Promise) {

};
