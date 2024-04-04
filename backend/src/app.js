const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.static("public"));

app.use(express.json({ limit: "15kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

const router = require("./router/userRouters.js");

app.use("/api/v1/users", router);

module.exports = { app };