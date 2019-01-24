
const bcrypt = require('../../node_modules/bcrypt')

let USERS = [{username: "Carson", password: "1", department: "sheriff"}, {username: "Chester", password: "2", department: "deputy"}, {username: "Caleb", password: "3", department: "citizen"}]

let HASHEDU = USERS.map( (user) => {
  user.password = bcrypt.hashSync(user.password, 16); return user})

console.log (HASHEDU)

exports.seed = function(knex, Promise) {

  return knex('users').truncate()
    .then(function () {

      return knex('users').insert(HASHEDU);
    });
};
