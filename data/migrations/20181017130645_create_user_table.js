
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', users => {
        users.increments();
        users.string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
        users.string('department', 128);
    });
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
