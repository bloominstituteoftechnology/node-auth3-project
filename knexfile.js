// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth.db'
    },
    useNullAsDefault: true, 

    migrations: {
      directory: "./database/migrations"
    },
    
    seeds: {
      directory: "./database/seeds"
    }
  }  
};
