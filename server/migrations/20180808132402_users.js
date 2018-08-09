
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments();
        tbl.text('username').unique().notNullable();
        tbl.text('password').notNullable();
        tbl
            .integer('deptcode')
            .notNullable()            
            .references('code')
            .inTable('departments')
            .onUpdate('CASCADE')
            .onDelete('SET DEFAULT')
            .defaultTo('not provided');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
