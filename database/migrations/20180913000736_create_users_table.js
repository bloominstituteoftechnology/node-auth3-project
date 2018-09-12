exports.up = function(knex, Promise) {
  return knex.schema.createTable(`users`, table => {
    table.increments(`id`).primary(), table.string(`name`).notNullable();
    table.string(`password`).notNullable();
    table.string(`department`).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(`users`);
};
