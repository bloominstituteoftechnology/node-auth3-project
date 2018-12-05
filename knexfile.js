module.exports = {
  development: {
    client: 'sqlite2',
    connection: { filename: './database/auth.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds'}
  }
}