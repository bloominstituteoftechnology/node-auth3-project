
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('username')
            .notNullable()
            .unique();

        users.string('password', 128)
            .notNullable();

        users.string('department')
            .notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
