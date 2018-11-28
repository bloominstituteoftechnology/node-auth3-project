exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments()
        users
            .string('username', 140)
            .notNullable()
            .unique()
        users
            .string('password', 140)
            .notNullable()
        users
            .string('department', 140)
            .notNullable()
    })
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};