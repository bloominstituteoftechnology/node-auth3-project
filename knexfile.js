// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/auth.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seed: {
      directory: './data/seed'
    }
  },

  pool: {
    afterCreate: (connection, done) => {
      connection.run('PRAGMA foreign_keys = ON', done)
    }
  }

}
