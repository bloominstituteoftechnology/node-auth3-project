
exports.up = function(knex, Promise) {
    return knex.raw('ALTER TABLE users ADD created_at DATETIME');
};

exports.down = function(knex, Promise) {
    return knex.raw('DROP COLUMN IF EXISTS created_at');
};
