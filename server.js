// exports.up = function(knex, Promise) {
//     return knex.schema.createTable('users', table => {
//         table.increments();
//         table.string('username').notNullable();
//         table.string('password').notNullable();
//         table.string('department').notNullable();
  
//     })
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTableIfExists('users')
// };


// const bcrypt = require('../../node_modules/bcrypt')

// let USERS = [{username: "Carson", password: "1", department: "sheriff"}, {username: "Chester", password: "2", department: "deputy"}, {username: "Caleb", password: "3", department: "citizen"}]

// let HASHEDU = USERS.map( (user) => {return user.password = bcrypt.hashSync(user.password, 16)})

// exports.seed = function(knex, Promise) {

//   return knex('users').truncate()
//     .then(function () {

//       return knex('users').insert(HASHEDU);
//     });
// };