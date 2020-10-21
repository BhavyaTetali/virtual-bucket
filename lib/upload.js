/*
const AWS = require('aws-sdk');
const fs = require('fs');

var s3 = new AWS.S3();
const filePath = './data/data.json';
const bucketName = 'your.bucket.name';
const key = 'data/data.json';

const uploadFile = (filePath, bucketName, key) => {
  fs.readFile(filePath, (err, data) => {
    if (err) console.error(err);
    var base64data = new Buffer(data, 'binary');
    var params = {
      Bucket: bucketName,
      Key: key,
      Body: base64data
    };
    s3.upload(params, (err, data) => {
      if (err) console.error(`Upload Error ${err}`);
      console.log('Upload Completed');
    });
  });
};


function uploadPage(req, res, next) {
    // uploadFile(filePath, bucketName, key);
    uploadFile(req.body.filePath, "MYVIRTUALBUCKET", username + req.body.filePath);
}


*/