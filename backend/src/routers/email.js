const express = require("express");

const router = new express.Router();

const UserBl = require("../business/user-bl");
const EmailVerificationBl = require("../business/email-verification-bl");
const { tryRun } = require("./_helper");

router.post("/api/email", async (req, res) => {
  const { email } = req.body;
 
  const user = await new UserBl().findByEmail(email);

  res.status(200).send({existed: user !== null});

});


router.post("/api/email/request-verify", async (req, res) => {
 await tryRun(req, res, async () => {
    const { email } = req.body;
    await new EmailVerificationBl().sendVerificationEmail(email);
    res.status(200).send("Email is sent successfully.");
  });
});

router.post("/api/email/verify", async (req, res) => {
  await tryRun(req, res, async () => {
    const { email, token } = req.body;
    await new EmailVerificationBl().verifyEmail(email, token);
    res.status(200).send("Email is sent successfully.");
  });
});

module.exports = router;
