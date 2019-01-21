
exports.up = function(knex, Promise) {
  return knex.schema('users', tbl=>{
      tbl.increments('user_id');
      tbl.string('username').notNullable().required().unique();
      tbl.sting('password').notNullable().required();
      tbl.string('departments');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
