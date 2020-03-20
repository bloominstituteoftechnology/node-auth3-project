exports.up = function(knex) {
    return (
        knex.schema
            .createTable('users', tbl => {
                tbl.increments()
                tbl.text('username')
                    .notNullable()
                    .unique();
                tbl.string('password').notNullable();
                tbl.text('department').notNullable();
            })
    );
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTableIfExists('users')
  );
};