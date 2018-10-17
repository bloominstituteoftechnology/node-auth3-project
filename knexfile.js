// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: './dev.sqlite3' },
    migrations: { directory: './database/migrations', },
    seeds: { directory: './database/seeds', },
    useNullAsDefault: true,
  }
};