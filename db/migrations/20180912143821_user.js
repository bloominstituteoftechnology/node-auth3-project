
exports.up = function(knex, Promise) {
  knex.schema.createTable('user',function(tbl){
      tbl.increments('id');
      tbl
        .string('username',128)
        .notNullable()
        .unique();
      tbl
        .string('password',128)
        .notNullable();
      tbl
        .string('department',128)
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('user')
};
