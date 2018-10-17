exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').truncate()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				// Finance department
				{
					username: 'finance-user-1',
					password: 'financeuser1pass',
					department: 'Finance'
				},
				{
					username: 'finance-user-2',
					password: 'financeuser2pass',
					department: 'Finance'
				},
				{
					username: 'finance-user-3',
					password: 'financeuser3pass',
					department: 'Finance'
				},
				// HR department
				{
					username: 'hr-user-1',
					password: 'hruser1pass',
					department: 'HR'
				},
				{
					username: 'hr-user-2',
					password: 'hruser2pass',
					department: 'HR'
				},
				{
					username: 'hr-user-3',
					password: 'hruser3pass',
					department: 'HR'
				},
				// IT department
				{
					username: 'it-user-1',
					password: 'ituser1pass',
					department: 'IT'
				},
				{
					username: 'it-user-2',
					password: 'ituser2pass',
					department: 'IT'
				},
				{
					username: 'it-user-3',
					password: 'ituser3pass',
					department: 'IT'
				},
			]);
		});
};
