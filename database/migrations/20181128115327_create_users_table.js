exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', tbl => {
    // col id, primary key
    tbl.increments();

    // col username
    tbl
      .string('username', 128)  // type of input
      .notNullable()  // cannot be empty
      .unique(); // cannot have duplicates

    // col password
    tbl.string('password', 128).notNullable();

    // col department
    tbl.string('department');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users');
};
