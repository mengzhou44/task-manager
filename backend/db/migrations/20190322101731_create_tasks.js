exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable("tasks", table => {
        table.increments("id").primary();
        table.string("description").notNullable();
        table.boolean("completed").notNullable();
        table.integer("user_id").notNullable().references('users.id');
      })
    ]);
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.dropTable("tasks")]);
  };
  