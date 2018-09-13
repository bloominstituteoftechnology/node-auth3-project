exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_department', table => {
    table
      .integer('user_id')
      .notNullable()
      .unsigned();
    table
      .integer('department_id')
      .notNullable()
      .unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_department');
};
