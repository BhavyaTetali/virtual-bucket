var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");

require("dotenv").config();
AWS.config.update({
  region: process.env["AWS_REGION"],
  accessKeyId: process.env["ACCESS_KEY_ID"],
  secretAccessKey: process.env["SECRET_ACCESS_KEY"],
});

function signInUser(req, res, next) {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  var input = {
    AuthFlow: 'USER_PASSWORD_AUTH', 
    ClientId: process.env["CLIENT_ID"],
    AuthParameters:{
        'USERNAME': req.body.email,
        'PASSWORD': req.body.password
      }
  };

  cognito.initiateAuth(input, function (err, data) {
      console.log(data);
    if (err) {
      console.log("Unable to login! Error: " + JSON.stringify(err));
      res.status(404).json({
        err: "Failed to Login!",
      });
    } else {
      console.log("Login is successful!");
      res.status(200).json({
        message: "Login is successful!",
      });
    }
    return next();
  });
}

router.post("/", signInUser);

module.exports = router;
