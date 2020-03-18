
exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments()
        table.text("username").notNull().unique()
        table.text("password").notNull()
        table.text("department")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};

/*The user schema should include: `username`, `password` and `department`. The `department` should be a string used to group the users. 
No need for a `departments` table or setting up relationships.*/