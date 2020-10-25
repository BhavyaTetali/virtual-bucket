var express = require("express");
var router = express.Router();
const AWS = require("aws-sdk");

require("dotenv").config();
AWS.config.update({
  accessKeyId: process.env["ACCESS_KEY_ID"],
  secretAccessKey: process.env["SECRET_ACCESS_KEY"],
});
const db = new AWS.DynamoDB();

function getFilesInfo(req, res, next) {
  var scanInput = {
    ExpressionAttributeNames: {
      "#FN": "fileName",
      "#CT": "creationTime",
      "#UT": "updatedTime",
      "#FT": "fileType",
    },
    ExpressionAttributeValues: {
      ":u": {
        S: req.body.username,
      },
      ":d": {
        BOOL: false,
      },
    },
    FilterExpression: "userName = :u AND isDeleted = :d",
    ProjectionExpression: "#FN, #FT, #CT, #UT",
    TableName: process.env["DYNAMODB_TABLE_NAME"],
  };

  db.scan(scanInput, function (err, data) {
    if (err) {
      console.log("Failed to list:", err);
      res.status(404).json({
        err: "Error loading dashboard!",
      });
    } else {
      console.log("Succesful in scanning and retrieving data of the user:");
      res.status(200).json({
        message: data.Items,
      });

    }
  });
}

router.post("/", getFilesInfo);

module.exports = router;
