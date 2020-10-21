var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");

require("dotenv").config();
AWS.config.update({
  region: process.env["AWS_REGION"],
  accessKeyId: process.env["ACCESS_KEY_ID"],
  secretAccessKey: process.env["SECRET_ACCESS_KEY"],
});

function deleteUser(req, res, next) {
  const cognito = new AWS.CognitoIdentityServiceProvider();
  var input = {
    UserPoolId: process.env["USER_POOL_ID"],
    Username: req.body.email
  };

  cognito.adminDeleteUser(input, function (err, data) {
    console.log(data);
    if (err) {
      console.log("Unable to delete user! Error: " + JSON.stringify(err));
      res.status(404).json({
        err: "Failed to delete user!",
      });
    } else {
      console.log("Successfully deleted user!");
      res.status(200).json({
        message: "Successfully deleted user!",
      });
    }
    return next();
  });
}

router.post("/", deleteUser);

module.exports = router;
