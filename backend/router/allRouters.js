const express = require("express");
const router = express.Router();

const UserRouter = require("../router/userRouters")

router.use("/user", UserRouter)

module.exports = router;