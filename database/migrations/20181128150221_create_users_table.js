exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', tbl => {
    //  id is the primarty primary key
    tbl.increments();

    // username

    tbl
        .string('username', 128)  // type of input
        .notNullable()  // cannot be empty
        .unique(); // cannot have duplicates
    //  password
    tbl.string('password', 128).notNullable();
    //  department
    tbl.string('department');
    });
};


exports.down = (knex, Promise) => {
    return knex.schema.dropTableIfExists('users');
};
