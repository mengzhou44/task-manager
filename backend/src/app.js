require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use(helmet());

app.use(require("./routers/public"));
app.use(require("./routers/email"));
app.use(require("./routers/password"));
app.use(require("./routers/user"));
app.use(require("./routers/task"));

module.exports = app;
