const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAddharImage,
  updateUserAvatar,
  getUserProfileDetails,
} = require("../controller/userController.js");

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
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/addhar-image")
  .patch(verifyJWT, upload.single("addharImage"), updateUserAddharImage);

router.route("/getuserprofile").get(verifyJWT, getUserProfileDetails);

module.exports = router;
