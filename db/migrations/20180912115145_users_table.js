
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments('userId');

    users.string('username', 128).notNullable().unique();
    users.string('password', 128).notNullable();
    // users
    //   .int('departmentId')
    //   .unsigned()
    //   .notNullable()
    //   .references('departmentId')
    //   .inTable('departments');
    users
      .integer('roleId')
      .unsigned()
      .notNullable()
      .references('roleId')
      .inTable('roles');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
