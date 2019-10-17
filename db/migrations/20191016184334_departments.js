
exports.up = function(knex) {

    return knex.schema.table('users', tbl => {
        tbl.string('departments', 128);
    });
  
};

exports.down = function(knex) {

    return knex.schema.table('users', tbl => {
        tbl.dropColumn('departments');
    });
  
};
