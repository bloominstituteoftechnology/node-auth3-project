
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users' user => {
    user.increments();
    user.string('name').notNullable();
    user.string('password').notNullable();
    user.string('department').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('users');
};
