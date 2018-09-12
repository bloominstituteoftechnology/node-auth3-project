
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departments', departments => {
    departments.increments('departmentId');

    departments.string('department_name', 128).notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('departments');
};
