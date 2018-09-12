
exports.up = function(knex, Promise) {
   return knex.schema.createTable('usernames', function(tbl) {
      tbl.increments();
      tbl.string('username', 128)
         .notNullable()
         .unique('username');
      tbl.string('password', 128)
         .notNullable();
      tbl.string('department', 128);
   })
 };
 
 exports.down = function(knex, Promise) {
   return knex.schema.dropTable('usernames');
 };