const express = require("express");
const {
  getCampData,
  getBloodFormData,
} = require("../controller/bloodManagementController");
const router = express.Router();

router.route("/blood-camps").get(getCampData);
router.route("/blood-forms").get(getBloodFormData);

module.exports = router;
