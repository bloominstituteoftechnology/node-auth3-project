exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    //PK
    tbl.increments();

    //Username
    tbl
      .string("username", 128)
      .unique()
      .notNullable();

    //Password
    tbl.string("password", 128).notNullable();

    //Department
    tbl.string("department").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
