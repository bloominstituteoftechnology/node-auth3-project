
exports.up = function(knex, Promise) {
  return knex.schema.createTable('userInfo', user => {
      user.increments();
      user.string('username').unique().notNullable();
      user.string('password').notNullable();
      user.string('department').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('userInfo');
};
