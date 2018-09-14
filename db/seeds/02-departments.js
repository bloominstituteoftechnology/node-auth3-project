
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('departments').del()
    .then(function () {
      // Inserts seed entries
      return knex('Departments').insert([
        {department_name: 'Marketing'},
        {department_name: 'Development'}
      ]);
    });
};
