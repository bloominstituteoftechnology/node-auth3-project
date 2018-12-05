exports.up = function(knex) {
    return knex.schema.table('users', table => {
      table.string('department', 255);
    });
  };
   exports.down = function(knex, Promise) {
    return knex.schema.table('users', table => {
      table.dropColumn('department');
    });
  };