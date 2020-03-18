exports.up = function(knex) {
  return knex.schema.createTable("accounts", table => {
    table.increments("id");
    table.text("name").notNullable().unique();
    table.text("password").notNullable();
    table.text("department").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("accounts");
};
