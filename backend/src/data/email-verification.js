const { Model } = require("./index");

class EmailVerification extends Model {
  static get tableName() {
    return "email_verifications";
  }
}

module.exports = EmailVerification;
