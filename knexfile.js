// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth2.sqlite3'
    },
  scripts: {
	"server": "nodemon"
    },
  useNullAsDefault: true,
  
  }

};
