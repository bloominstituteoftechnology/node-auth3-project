const db = require('../dbConfig.js');

module.exports = {
	getAllUsers: function() {
		let query = db('users')
		return query
			.select('id', 'username', 'department');
	},
};
