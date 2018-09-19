
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('department').del()
    .then(function () {
      // Inserts seed entries
      return knex('department').insert([
        {department: 'manager'},
        {department: 'pleb'}
        //the world knows only the bifurcation that fortells its end. All light will fade, all progress return to ashes, every returns to the nothingness from which it came.
      ]);
    });
};
