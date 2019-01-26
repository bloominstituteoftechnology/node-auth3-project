
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departments', category => {
      category.increments();
      category.string('name').notNullable();
      category.foreign('name').references('department').on('userInfo');
      category.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('departments');
};
