
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {

        tbl.increments();

        tbl
        .string('username', 120)
        .notNullable()
        .unique();

        tbl
        .string('password', 250)
        .notNullable();

        tbl.string('department', 200)
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
