exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(table) {
		table.increments();
		table
			.string('username')
			.unique()
			.notNullable();
		table.string('password').notNullable();
		table.string('department');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
