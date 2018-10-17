const db = require('../dbConfig.js');

module.exports = {
	getAllUsers: function(department) {
		let query = db('users')
		return query
			.select('id', 'username', 'department')
			.where({ department: department });
	},
	getUser: function(username) {
		let query = db('users')
		return query
			.select('id', 'username', 'password', 'department')
			.where({ username: username });
	},
	insertNewUser: function(user) {
		let query = db('users')
		return query
			.insert(user)
			.then(id => ({ id: id }));
	},
};
