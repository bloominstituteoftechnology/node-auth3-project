
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', (tbl) => {
        tbl.defaultTo(knex.raw`(DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))`)    
    });  
};

exports.down = function(knex, Promise) {
    return knex.raw('DROP COLUMN IF EXISTS created_at');
};
