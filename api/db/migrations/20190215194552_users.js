
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl){
        tbl.increments();
        tbl.string('userName', 200).notNullable();
        tbl.string('Password',300).notNullable();
        tbl.string('department',200).notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};