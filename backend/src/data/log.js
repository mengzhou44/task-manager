const { Model } = require("./index");
 
 class Log extends Model {
  static get tableName() {
    return "logs";
  }
};

module.exports = Log;
