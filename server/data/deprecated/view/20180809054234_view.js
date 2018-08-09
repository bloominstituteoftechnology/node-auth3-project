
exports.up = function(knex, Promise) {
    return knex.raw('CREATE VIEW myview AS SELECT * FROM users LEFT JOIN departments ON users.deptcode = departments.code ORDER BY code, username');
};

exports.down = function(knex, Promise) {
    return knex.raw('DROP VIEW IF EXISTS myview');
};
