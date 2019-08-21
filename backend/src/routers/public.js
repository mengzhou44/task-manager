const express = require("express");

const router = new express.Router();

const UserBl = require("../business/user-bl");

router.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

 

module.exports = router;
