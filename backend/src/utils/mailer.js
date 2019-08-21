"use strict";

const nodemailer = require("nodemailer");
const fs = require("fs");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SYSTEM_EMAIL,
        pass: process.env.SYSTEM_EMAIL_PASSWORD
      }
    });
  }

  fetchEmailTemplateSync(templateFile) {
    const folder = "./src/templates/email/";

    const baseTemplate = fs.readFileSync(folder + "base.html", "utf8");
    const contentTemplate = fs.readFileSync(folder + templateFile, "utf8");

    return baseTemplate.replace("{content}", contentTemplate);
  }

  async sendEmail({ subject, to, html }) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          subject,
          from: process.env.SYSTEM_EMAIL,
          to,
          html
        },
        error => {
          if (error) {
            reject(error);
          } else {
            resolve({
              succes: true,
              message: "Email sent successfully"
            });
          }
        }
      );
    });
  }
}

module.exports = Mailer;
