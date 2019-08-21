const express = require("express");
const Joi = require("joi");

const router = new express.Router();

const UserBl = require("../business/user-bl");
const auth = require("../auth");

const { getProfileByToken } = require("../utils/social-auth");

const { tryRun, validate } = require("./_helper");

router.post("/api/signup/social", async (req, res) => {
  await tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        phone: Joi.string().required(),
        providerToken: Joi.string().required(),
        providerType: Joi.string().required()
      })
    );

    let user = await getProfileByToken(req.body);
    user.phone = phone;
    const result = await new UserBl().socialSignUp(user);
    res.status(200).send(result);
  });
});

router.post("/api/signin/social", async (req, res) => {
  await tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        providerToken: Joi.string().required(),
        providerType: Joi.string().required()
      })
    );

    let profile = await getProfileByToken(req.body);
    const result = await new UserBl().socialSignIn(profile.email);
    result.user.picture = profile.picture;

    res.status(200).send(result);
  });
});

router.post("/api/signup", async (req, res) => {
  await tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().required(),
        image: Joi.object().keys({
          data: Joi.string().required(),
          type: Joi.string().required()
        })
      })
    );
    const result = await new UserBl().signUp(req.body);
    res.status(200).send(result);
  });
});

router.post("/api/signin", async (req, res) => {
  await tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
    );

    const result = await new UserBl().signIn(req.body);
    res.status(200).send(result);
  });
});

router.post("/api/signout", auth, async (req, res) => {
  await tryRun(req, res, async () => {
    await new UserBl().signOut(req.user, req.token);
    res.status(200).send();
  });
});

module.exports = router;
