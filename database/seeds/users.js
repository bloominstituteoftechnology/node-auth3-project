//Users Table 
const config = require('../../config.js');

// Test Data 
const testData = [
    {
        [config.FIELD_USERNAME  ]: 'testing',
        [config.FIELD_PASSWORD  ]: 'thisbetterbeworking',
        [config.FIELD_DEPARTMENT]: 'Test Department',
    },
];

// Seed Table with Example Data 
exports.seed = async function(knex, Promise) {
    await knex(config.TABLE_USERS).del();
    return await knex(config.TABLE_USERS).insert(testData);
};