var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  filename = path.basename(asset) || 'index.html';
  // check if asset exists in our folder
  var filetype = filename.split('.')[1];
  if (filetype === 'css') {
    this.headers['Content-Type'] = "text/css";
  } else {
    this.headers['Content-Type'] = "text/html";
  }
  var that = this;
  fs.readFile('./public/' + filename, 'utf8', function (err, data) {
    if (err) {
      return err;
    }
    that.sendResponse(res, data);
  });  //??
  // fs.stat('./public/' + filename, function (err, stat) {
  //   if(err == null) {
  //     readContent('./public/' + filename, function(err, data) {
  //       that.sendResponse(res, data);
  //     });
  //   }
  // });

  // if yes, send response directly
  // if not, 404

};



// As you progress, keep thinking about what helper functions you can put here!
exports.sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;

  response.writeHead(statusCode, headers);
  response.write(data);
  response.end();
};


var readContent = function (filename, callback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
};
