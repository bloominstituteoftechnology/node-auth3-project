// Update with your config settings.

module.exports = {

	  development: {
		    client: 'sqlite3',
	    connection: {
		      filename: './db/db.sqlite3', // update path
	    },
    useNullAsDefault: true,
	   migrations: {
		      // add this line
     directory: './db/migrations/_courses_table.js',
	    },
		    seeds: {
		      // add this line
	   directory: './db/seeds',
	    },
  },

};
