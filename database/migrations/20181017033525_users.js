
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (users) {
        users
            .increments();
        users
            .string('username', 20)
            .notNullable()
            .unique();
        users
            .string('password', 255)
            .notNullable();
        users
            .string('department', 255)
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};