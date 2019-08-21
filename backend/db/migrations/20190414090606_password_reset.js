exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("password_reset", table => {
      table.increments("id").primary();
      table.string("token").notNullable();
      table.integer("user_id").notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("password_reset")]);
};
