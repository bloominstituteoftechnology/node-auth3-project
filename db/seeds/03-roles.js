
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {role_name: 'Social Media', departmentId: 1},
        {role_name: 'Copywriter', departmentId: 1},
        {role_name: 'Front-End', departmentId: 2},
        {role_name: 'Back-End', departmentId: 2}
      ]);
    });
};
