

//== Users Table ===============================================================

//-- Dependencies --------------------------------
const config = require('../../config.js');

//-- Test Data -----------------------------------
const testData = [
    {
        [config.FIELD_USERNAME  ]: 'test user',
        [config.FIELD_PASSWORD  ]: '$2a$04$V2NVQ0uvMkLwIUrha9rfteMR.HS.mvDJVEsoH19lVNoYa5CDjyXu6',
        [config.FIELD_DEPARTMENT]: 'Test Department',
    },
];

//-- Seed Table with Example Data ----------------
exports.seed = async function(knex, Promise) {
    await knex(config.TABLE_USERS).del();
    return await knex(config.TABLE_USERS).insert(testData);
};
