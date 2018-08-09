
exports.up = function(knex, Promise) {
    return knex.schema.createTable('departments', (tbl) => {
        tbl.increments();
        tbl.text('name').unique().notNullable();
        tbl
            .integer('code')
            .unique()
            .notNullable()
            .defaultTo('not available');
    }) 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
