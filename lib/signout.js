var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");

require("dotenv").config();
AWS.config.update({
  region: process.env["AWS_REGION"],
  accessKeyId: process.env["ACCESS_KEY_ID"],
  secretAccessKey: process.env["SECRET_ACCESS_KEY"],
});

function signOut(req, res, next) {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  var input = {
    AccessToken: req.body.token
  };

  cognito.globalSignOut(input, function (err, data) {
      console.log(data);
    if (err) {
      console.log("Unable to logout! Error: " + JSON.stringify(err));
      res.status(404).json({
        err: "Failed to Sign out!",
      });
    } else {
      console.log("Logout is successful!");
      res.status(200).json({
        message: "Sign out is successful!",
      });
    }
    return next();
  });
}

router.post("/", signOut);

module.exports = router;
