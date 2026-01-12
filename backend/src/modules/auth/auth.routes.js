const express = require("express");
const router = express.Router();

const {
  signupHandler,
  loginHandler,
  myProfileHandler,
  updateProfileHandler,
  logoutHandler
} = require("./auth.controller");

const protect = require("../../middlewares/auth.middleware");

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/me", protect, myProfileHandler);
router.patch("/profile", protect, updateProfileHandler);
router.post("/logout", protect, logoutHandler); // ✅ protected now

module.exports = router;
