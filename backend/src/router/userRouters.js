const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("../controller/userController.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "addharImage", maxCount: 1 },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);

//secure routes
/**
 * in logout i dont have user information.
 * verifyJWT middleware get the token from the cookies, i prev. sended during login.
 * then using that token verify the loginuser in DB.
 * add that user information in "request"
 */
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
