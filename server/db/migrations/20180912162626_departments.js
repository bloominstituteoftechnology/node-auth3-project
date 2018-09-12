exports.up = (knex, Promise) => {
  return knex.schema.createTable('departments', t => {
    t.increments();
    t.string('department');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('departments');
};
