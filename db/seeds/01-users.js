const bcrypt = require('bcryptjs')

//example passwords for practice

//admins passwords
const hash1 = bcrypt.hashSync('12345', 10);
const hash2 = bcrypt.hashSync('12345', 10);
const hash3 = bcrypt.hashSync('12345', 10);
const hash4 = bcrypt.hashSync('12345', 10);

//IT employs passwords
const hash5 = bcrypt.hashSync('12345', 10);
const hash6 = bcrypt.hashSync('12345', 10);
const hash7 = bcrypt.hashSync('12345', 10);

//Sales employes passwords
const hash8 = bcrypt.hashSync('12345', 10);
const hash9 = bcrypt.hashSync('12345', 10);
const hash10 = bcrypt.hashSync('12345', 10);

//Acounting employess passwords
const hash11 = bcrypt.hashSync('12345', 10);
const hash12 = bcrypt.hashSync('12345', 10);
const hash13 = bcrypt.hashSync('12345', 10);

//Management employess passwords
const hash14 = bcrypt.hashSync('12345', 10);
const hash15 = bcrypt.hashSync('12345', 10);
const hash16 = bcrypt.hashSync('12345', 10);



exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([

        //admin IT
        {username: 'marshall', password: hash1, department: 'IT'}, 
        //employes IT
        {username: 'melvin', password: hash2, department: 'IT'}, 
        {username: 'jessica', password: hash3, department: 'IT'}, 
        {username: 'tommon', password: hash4, department: 'IT'}, 

        //admin Sales
        {username: 'eric', password: hash5, department: 'Sales'},
        //employees Sales
        {username: 'rubarb', password: hash6, department: 'Sales'},
        {username: 'blobic', password: hash7, department: 'Sales'},
        {username: 'gorgey', password: hash8, department: 'Sales'},

        //admin accounting
        {username: 'chuck', password: hash9, department: 'Accounting'},
        //employees Accounting
        {username: 'hubertic', password: hash10, department: 'Accounting'},
        {username: 'Nessy', password: hash11, department: 'Accounting'},
        {username: 'Tupaca', password: hash12, department: 'Accounting'},

        //admin management
        {username: 'karen', password: hash13, department: 'Management'},
        //employees management
        {username: 'roberto', password: hash14, department: 'Management'},
        {username: 'cutebuto', password: hash15, department: 'Management'},
        {username: 'Mario', password: hash16, department: 'Management'},

      ]);
    });
};
