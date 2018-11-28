exports.seed = function(knex, Promise){
    // Deletes ALL existing entries
    return knex('users').truncate().then(function(){
        // Inserts seed entries
        return knex('users').insert([
            { username: 'rowValue1', password: 'Password', department: 'department' },
            { username: 'rowValue2', password: 'Password', department: 'department' },
            { username: 'rowValue3', password: 'Password', department: 'department' },
        ])
    })
}
