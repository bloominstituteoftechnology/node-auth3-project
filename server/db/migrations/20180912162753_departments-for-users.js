exports.up = (knex, Promise) => {
  return knex.schema.createTable('departments-for-users', t => {
    t.increments();
    t.integer('user_id').references('users.id').notNullable();
    t.integer('department_id').references('departments.id').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('departments-for-users');
};
