var url = require('url');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httphelpers = require("./http-helpers.js");
// require more modules/folders here!
var fs = require('fs');

exports.handleRequest = function (req, res) {
  //check if file exists
  //if it does, read data and attach to response
  urlPath = url.parse(req.url).pathname;
  httphelpers.serveAssets(res, urlPath);
  // httphelpers.sendResponse(res, urlPath);
  // example urlPath "/public/styles.css"

  // filename = path.basename(urlPath);
  // filename = path.basename(response.url);

  //httphelpers.serveAssets(res, urlPath);

  // fs.stat('./public/' + (filename || 'index.html'), function (err, stat) {
  //   if(err == null) {
  //     readContent('./public/index.html', function(err, data) {
  //       // httphelpers.sendResponse(res, filename);
  //       httphelpers.serveAssets(res, data);
  //     });
  //   }
  // });


  // fs.readFile('./public/index.html', function(err, data) {
  //   httphelpers.sendResponse(res, data);
  // });

  //res.end(archive.paths.list);

};


var readContent = function (filename, callback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
};

// readContent('someText', function (err, data) {
//   console.log(data);
// })
