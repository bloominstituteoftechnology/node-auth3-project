// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    userNullAsDefault: true,
    connection: {
      filename: "./database/auth.db3"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
