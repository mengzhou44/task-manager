const express = require("express");
const Joi = require("joi");
const router = new express.Router();

const PasswordResetBl = require("../business/password-reset-bl");

const { tryRun, validate } = require("./_helper");

router.post("/api/password/request-reset", async (req, res) => {
  await tryRun(req, res, async () => {
    const { email } = req.body;
    await new PasswordResetBl().sendPasswordResetEmail(email);
    res.status(200).send("Email is sent successfully.");
  });
});

router.post("/api/password/reset", async (req, res) => {
  await tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        token: Joi.string().required(),
        newPassword: Joi.string()
          .required()
          .min(6)
      })
    );

    const { token, newPassword } = req.body;
    await new PasswordResetBl().resetPassword(token, newPassword);
    res.status(200).send("Password is reset successfully!");
  });
});

module.exports = router;
