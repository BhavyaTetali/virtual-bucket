var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var welcomeHandler = require("./lib/welcome");
var signupHandler = require("./lib/signup");
var signinHandler = require("./lib/signin");
var signoutHandler = require("./lib/signout");
var uploadHandler = require("./lib/upload");
var deleteUserHandler = require("./lib/deleteuser");
var downloadHandler = require("./lib/download");
var deleteHandler = require("./lib/delete");
var dashboardHandler = require("./lib/dashboard");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  console.log("recieved request");
  //res.sendFile(path.join(__dirname, 'views/index.html'))
  res.render('index');
  return;
});

/* main APIs */
app.use("/welcome", welcomeHandler);
app.use("/signup", signupHandler);
app.use("/signin", signinHandler);
app.use("/signout", signoutHandler);
app.use("/deleteuser", deleteUserHandler);
app.use("/upload", uploadHandler);
app.use("/download", downloadHandler);
app.use("/delete", deleteHandler);
app.use("/dashboard", dashboardHandler);



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
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || "Unknown error",
  });
  next()
});

module.exports = app;
