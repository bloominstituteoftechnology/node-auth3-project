module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth_ii.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'auth_ii_migrations'
    }
  }
};
