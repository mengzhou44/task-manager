const Log = require("../data/log");

const logText = async text => {
  await Log.query()
    .allowInsert("[text]")
    .insert({ text });
};

module.exports = { logText };
