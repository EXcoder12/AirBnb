const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup.ejs");
  })
  .post(wrapAsync(userController.signUp));

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.logIn
  );

//LogOut route
router.get("/logout", userController.logOut);

// Route for My Account page
router.get("/users/account", isLoggedIn, wrapAsync(userController.showAccount));

// Route for My Bookings page
router.get(
  "/users/bookings",
  isLoggedIn,
  wrapAsync(userController.showBookings)
);

module.exports = router;
