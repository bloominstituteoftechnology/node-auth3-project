// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/webauth.db3'
    },

    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },

    migrations: {
      directory: './db/migrations'
    },

    seeds: {
      directory: './db/seeds'
    }
    
  }
  
  
};
