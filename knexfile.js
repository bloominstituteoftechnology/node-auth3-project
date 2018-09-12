// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/lambda.sqlite3'
    },
    migrations: {
      directory: './db/migrations'
    }
  },
};
