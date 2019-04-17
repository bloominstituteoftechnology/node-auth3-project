
exports.up = function(knex) {
  return knex.schema.createTable('user', (tbl)=>{
    tbl.increments();//primary key command defaults as ID

    tbl.string('user',128)
       .notNullable()
       .unique();

    tbl.string('password',128)
       .notNullable()
       .unique();

  

   
  
}
  )
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExist('user');
};


