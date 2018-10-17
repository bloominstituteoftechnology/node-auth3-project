module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/lambda-auth-ii.sqlite3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},
};
