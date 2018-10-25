exports.up = function(knex, Promise) {
  return knex.schema.table("users", function(users) {
    users.string("department");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("user", function(users) {
    courses.dropColumn("department");
  });
};
