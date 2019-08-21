const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const PasswordReset = require("../data/password-reset");
const User = require("../data/user");
const Mailer = require("../utils/mailer");
const { getWebBaseUrl } = require("../utils/get-web-base-url");
const { executeInTransaction } = require("../data");

module.exports = class EmailVerificationBl {
  constructor(trx) {
    this.trx = trx;
  }

  getLink(token) {
    return `${getWebBaseUrl()}/password/reset/${token}`;
  }

  async sendPasswordResetEmail(email) {
    return executeInTransaction(this, async () => {
      const token = jwt.sign(
        { expired: moment().add(30, "minutes") },
        process.env.JWT_SECRET
      );

      const user = await User.query().findOne({ email });

      if (user === undefined) {
        throw new Error("Email does not exist!");
      }

      await PasswordReset.query(this.trx).insert({
        userId: user.id,
        token
      });

      const mailer = new Mailer();

      let html = mailer.fetchEmailTemplateSync("password-reset.html");

      html = html.replace("{link}", this.getLink(token));

      await mailer.sendEmail({
        to: email,
        html,
        subject: "Reset Password"
      });
    });
  }

  async resetPassword(token, newPassword) {
    let found = await PasswordReset.query().findOne({ token });
    if (found === undefined) {
      throw new Error("Reset link is invalid!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.expired < moment()) {
      throw new Error("Reset link is expired!");
    }
    let hashed = await bcrypt.hash(newPassword, 8);

    await User.query().patchAndFetchById(found.userId, {
      password: hashed
    });
  }
};
