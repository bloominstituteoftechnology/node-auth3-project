
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'cesar', password: 'letmein', department: 'chemistry' },
        { id: 2, username: 'luis', password: 'letmein', department: 'lamda school' },
        { id: 3, username: 'ana', password: 'letmein', department: 'biology' },
        { id: 4, username: 'vane', password: 'letmein', department: 'biology' },
        { id: 5, username: 'yogi', password: 'letmein', department: 'biology' },
        { id: 6, username: 'ileana', password: 'letmein', department: 'chemistry' }
      ])
    })
}
