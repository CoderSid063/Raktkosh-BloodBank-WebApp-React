const express = require("express");
const {
  getCampData,
  getBloodFormData,
  registerBloodCamps,
  registerBloodForms,
} = require("../controller/bloodManagementController");
const { verifyJWT } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const router = express.Router();

//bloodManagment routes:-
router
  .route("/register-camps")
  .post(verifyJWT, upload.single("addharImage"), registerBloodCamps);

router.route("/reqblood-donation").post(verifyJWT, registerBloodForms);
router.route("/blood-camps").get(getCampData);
// router.route("/reqblood-donation").get(getBloodFormData);

module.exports = router;
