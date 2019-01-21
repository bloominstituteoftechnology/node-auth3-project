// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/associates.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
