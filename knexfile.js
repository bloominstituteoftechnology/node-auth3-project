module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './datebase/users.db3',
    },
    migrations: {
      directory: './datebase/migrations',
    },
    seeds: {
      directory: './database/seeds',

    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
};

