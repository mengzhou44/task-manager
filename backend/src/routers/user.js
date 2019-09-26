const express = require("express");
const Joi = require("joi");
const router = new express.Router();
const UserBl = require("../business/user-bl");
const { tryRun, validate } = require("./_helper");

router.post("/api/signin/social", async (req, res) => {
  await tryRun(req, res, async () => {
    validate(
      req.body,
      Joi.object().keys({
        providerToken: Joi.string().required(),
        providerType: Joi.string().required()
      })
    );
    const result = await new UserBl().socialSignIn(req.body);  
    res.status(200).send(result);
  });
});


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
     

    const result = await new UserBl().socialSignUp(req.body);
    
    res.status(200).send(result);
  });
});


 

module.exports = router;
