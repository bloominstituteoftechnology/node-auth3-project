// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    migrtions: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
  }

};
