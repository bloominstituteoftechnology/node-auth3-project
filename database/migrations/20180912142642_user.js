exports.up = function(knex, Promise) {
  knex.schema.createTable("users", user => {
      user.increments(); 
      user
        .string("name", 128)
        .notNullable()
        .unique();
      user
        .string("password", 128)
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
  
};
