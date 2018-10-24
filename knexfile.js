module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './lambda.sqlite3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './migrations',
			tableName: 'migrations'
		},
		seeds: { directory: './seeds' }
	}
};
