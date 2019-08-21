
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("logs", table => {
            table.increments("id").primary();
            table.string("text").notNullable();
            table.date('createdOn').defaultTo(knex.fn.now())
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.dropTable("logs")]);
};
 