
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', roles => {
    roles.increments('roleId');

    roles.string('role_name', 128).notNullable().unique();
    roles
      .int('departmentId')
      .unsigned()
      .notNullable()
      .references('departmentId')
      .inTable('departments');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles');
};
