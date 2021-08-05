const express = require("express");
const passport = require("passport");
const {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
} = require("../controllers/user");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.route("/register").get(renderRegister).post(catchAsync(register));

router
  .route("/login")
  .get(renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    login
  );

router.get("/logout", logout);

module.exports = router;
