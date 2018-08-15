
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', user => {
        user.increments();
        user
            .string('username')
            .notNullable()
            .unique();
        user
            .string('password')
            .notNullable()
        user
            .string('department')
            .notNullable()
    })
};

exports.down = function(knex, Promise) {
  
};
