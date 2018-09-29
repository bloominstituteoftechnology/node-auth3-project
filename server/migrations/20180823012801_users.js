
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
      //primary key
      tbl.increments();
//The user schema should include: username, password and department. The department should be a string used to group the users. No need for a departments table or setting up relationships.
    
    tbl
        .string('department', 128);
        // .notNullable();
    
    tbl
        .string('username', 128)
        .notNullable()
        .unique();

    tbl 
        .string('password', 128)
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
  // drop the users table
  return knex.schema.dropTableIfExists('users');
};
