const Knex = require("knex");
const { knexSnakeCaseMappers, transaction } = require('objection');
const connection = require("../../db/knexfile");
const { Model } = require("objection");

const knex = Knex({
    ...connection,
    ...knexSnakeCaseMappers()
});


Model.knex(knex);

const executeInTest = async callback => {

    let trx = await transaction.start(knex);
    try {
      await callback(trx);
    } finally {
      await trx.rollback();
    }
}

const executeInTransaction = async (obj, callback) => {

    let trx = await transaction.start(knex);

    if (process.env.ENVIRONMENT !== 'test') {
        obj.trx = trx; 
    }

    try {
        const result = await callback();
        await trx.commit();
        return result;     
       }
       catch(e) {
        await trx.rollback();
        throw new Error(e.stack);
      }    
} 


module.exports = { 
  Model, 
  knex, 
  executeInTransaction, 
  executeInTest
}

 