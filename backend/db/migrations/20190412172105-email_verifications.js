exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("email_verifications", table => {
     
      table.increments("id").primary();
      table.string("email").notNullable();
      table.string("token").notNullable();
        table.boolean("verified").notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("email_verifications")]);
};
