const { Model } = require("./index");

class PasswordReset extends Model {
  static get tableName() {
    return "password_reset";
  }
}

module.exports = PasswordReset;
