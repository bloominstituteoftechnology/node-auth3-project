
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments();
    tbl.string('username', 128).notNullable();
    tbl.string('password', 128).notNullable();
    tbl.string('department', 64).notNullable();
  })
};

exports.down = function(knex, Promise) {

};
