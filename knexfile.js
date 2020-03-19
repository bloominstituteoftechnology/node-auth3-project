// Update with your config settings.

module.exports = {

  useNullAsDefault: true,
    client: 'sqlite3',
    connection: {
      filename: './data/user.db3'
    },

  
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds:{
      directory: './data/seeds'
    }
  

  

};
