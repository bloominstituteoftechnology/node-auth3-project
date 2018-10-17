module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth1.sqlite3'
    },
    useNullAsDefault:true,
    migrations: {
      directory: './database/migrations',
      tableName:'databaseMigrations',
    }
  },
};
