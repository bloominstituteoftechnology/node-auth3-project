
exports.up = function(knex, Promise) {
 return knex.schema.createTable('users',function(t){
	t.increments();
	
	t.string('username',144)
		.unique()
		.notNullable();
		
	t.string('password',256)
		.notNullable();
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dorpTableIfExists('users');
};
