exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", table => {
        table.increments();
        table.string("username", 42).unique().notNullable();
        table.string("password", 42).unique().notNullable();
        table.string("department", 42).notNullable();
    });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
}