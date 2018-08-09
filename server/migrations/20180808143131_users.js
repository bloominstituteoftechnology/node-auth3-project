
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments().primary();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('department').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {

};
