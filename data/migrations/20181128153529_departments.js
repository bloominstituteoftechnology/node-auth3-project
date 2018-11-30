
exports.up = function(knex, Promise) {
  return knex.schema.createTable('departments', table => {
    table.increments()
    table.string('department')
  })
};

exports.down = function(knex, Promise) {
  
};
