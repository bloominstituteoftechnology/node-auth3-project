// Update with your config settings.

//fake credentials to keep knex from freaking out
const localPg = {
  host: 'localhost',
  database: 'users',
  user: 'user',
  password: 'password'
}

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/users.db3'
    },
    migrations: { 
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/sees'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  production: {
    client: 'pg',
    connection: productionDbConnection,    //could be object or string
    migrations: {
      directory: './data/migrations',
    },
    seeds:      {
      directory: "./data/seeds",
    },
    useNullAsDefault: true
  }
};
