
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_name: 'Justin Turner', password: '', department: 'Infield'},
        {user_name: 'Matt Kemp', password: '', department: 'Outfield'},
        {user_name: 'Clayton Kershaw', password: '', department: 'Rotation'},
        {user_name: 'Kenley Jansen', password: '', department: 'Bullpen'},
        {user_name: 'Max Muncy', password: '', department: 'Infield'},
        {user_name: 'Yasiel Puig', password: '', department: 'Outfield'},
        {user_name: 'Kike Hernandez', password: '', department: 'Utility'},
        {user_name: 'Chris Taylor', password: '', department: 'Utility'},
        {user_name: 'Kenta Maeda', password: '', department: 'Rotation'},
        {user_name: 'Joc Pedersen', password: '', department: 'Outfield'},
        {user_name: 'Cody Bellinger', password: '', department: 'Infield'},
        {user_name: 'Scott Alexander', password: '', department: 'Bullpen'},
        {user_name: 'Manny Machado', password: '', department: 'Infield'},
        {user_name: 'Yasmani Grandal', password: '', department: 'Infield'},
        {user_name: 'Ross Stripling', password: '', department: 'Rotation'},
      ]);
    });
};
