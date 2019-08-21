const Joi = require("joi");

const validate = (object, schema) => {
  const result = Joi.validate(object, schema);

  if (result.error !== null) {
    throw new Error(result.error);
  }
};

const tryRun = async (req, res, fn) => {
  try {
    await fn();
  } catch (e) {
    console.log(e.message);
    console.log(e.stack);
    res.status(500).send({ path: req.path, message: e.message });
  }
};

module.exports = { tryRun, validate };
