
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.text('username')
                .notNullable();
            tbl.text('password')
                .notNullable();
            tbl.text('departments')
                .notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
};
