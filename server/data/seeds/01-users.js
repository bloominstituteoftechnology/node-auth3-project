
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "username": "admin",
          "password": "$2a$14$eBkWk7jdyRNEELTAtFOK.e4Ug/cwtaF.APGCD/dqZyHRAqWz/AkUy",
          "department": "admin"
        }
      ]);
    });
};
