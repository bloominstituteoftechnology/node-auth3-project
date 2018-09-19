// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
    tableName: 'databasemigrations',
  },
  seeds: { directory: './database/seeds' },
}
};
