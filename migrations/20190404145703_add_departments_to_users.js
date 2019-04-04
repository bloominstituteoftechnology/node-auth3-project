exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('department', 256)
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('products', function(t) {
        t.dropColumn('department');
    });
};
