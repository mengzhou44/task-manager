const moment = require("moment");
const jwt = require("jsonwebtoken");

const EmailVerification = require("../data/email-verification");
const Mailer = require("../utils/mailer");
const { getWebBaseUrl } = require("../utils/get-web-base-url");
const { executeInTransaction } = require("../data");

module.exports = class EmailVerificationBl {
  constructor(trx) {
    this.trx = trx;
  }

  getLink(email, token) {
    return `${getWebBaseUrl()}/email/verify/${email}/${token}`;
  }

  async sendVerificationEmail(email) {
    return executeInTransaction(this, async () => {
      await EmailVerification.query(this.trx)
        .delete()
        .where({ email });

      const token = jwt.sign(
        { expired: moment().add(10, "minutes") },
        process.env.JWT_SECRET
      );

      await EmailVerification.query(this.trx).insert({
        email,
        token,
        verified: false
      });

      const mailer = new Mailer();

      let html = mailer.fetchEmailTemplateSync("email-verification.html");

      html = html.replace("{link}", this.getLink(email, token));

      await mailer.sendEmail({
        to: email,
        html,
        subject: "Please verify your email"
      });
    });
  }

  async verifyEmail(email, token) {
    
    let found = await EmailVerification.query().findOne({ email, token });
    if (found === undefined) {
      return false;
    }
    const decoded = jwt.verify(found.token, process.env.JWT_SECRET);

    if (decoded.expired < moment()) {
      return false;
    }

    found.verified = true;
    await EmailVerification.query().patchAndFetchById(found.id, found);
    return true;
  }
};
