exports.up = function(knex) {
  return knex.schema.createTable("user", user => {
    user.increments();
    user.string("username", 100).notNullable();
    user.text("password", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
