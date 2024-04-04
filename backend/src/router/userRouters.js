const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware.js");
const { registerUser } = require("../controller/userController.js");

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "addharImage", maxCount: 1 },
  ]),
  registerUser,
);

module.exports = router;
