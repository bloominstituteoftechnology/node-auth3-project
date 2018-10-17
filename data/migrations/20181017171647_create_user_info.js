
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
          .string('username', 125)
          .notNullable();

        users
          .string('password', 100)
          .notNullable();

        users.string('department', 1000);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
