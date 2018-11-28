

//== Users Table ===============================================================

//-- Dependencies --------------------------------
const config = require('../../config.js');

//-- Create Users Table --------------------------
exports.up = function(knex, Promise) {
    return knex.schema.createTable(config.TABLE_USERS, table => {
        table.increments();
        table
            .string(config.FIELD_USERNAME, config.LIMIT_USERNAME)
            .notNullable()
            .unique();
        table
            .string(config.FIELD_PASSWORD, config.LIMIT_PASSWORD)
            .notNullable();
        table
            .string(config.FIELD_DEPARTMENT, config.LIMIT_DEPARTMENT)
            .notNullable();
    });
};

//-- Destroy Users Table -------------------------
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(config.TABLE_USERS);
};
