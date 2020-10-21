var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var welcomeHandler = require("./lib/welcome");
var signupHandler = require("./lib/signup");
var deleteUserHandler = require("./lib/deleteuser");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* main APIs */
app.use("/welcome", welcomeHandler);
app.use("/signup", signupHandler);
app.use("/deleteuser", deleteUserHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (res.headersSent) {
    return;
  }
  // Default error handler needs to be called only if headers were not already sent.
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status).json({
    message: err.message,
  });
  next()
});

module.exports = app;
