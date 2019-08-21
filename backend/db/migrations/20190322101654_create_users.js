exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", table => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("password");
      table.string("locale");
      table.string("picture").notNullable();
      table.string("phone").notNullable();
      table.string("tokens", 40000).defaultTo("");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("users")]);
};
