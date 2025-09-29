const User = require("../models/user.js");
const Listing = require("../models/listing.js");

// Renders the signup form
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Handles new user signup
module.exports.signUp = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Renders the login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Handles user login
module.exports.logIn = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Handles user logout
module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};


// Shows the user's account page
module.exports.showAccount = async (req, res) => {
  const user = req.user;
  res.render("users/account", {
    user,
    title: "My Account",
  });
};

// Shows the user's bookings page
module.exports.showBookings = async (req, res) => {
  const userListings = await Listing.find({ owner: req.user._id });
  res.render("users/bookings", {
    listings: userListings,
    title: "My Bookings",
  });
};