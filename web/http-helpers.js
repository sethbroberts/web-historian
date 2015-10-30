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

// var mimetypes =  {
//   '.html' : 'text/html',
//   '.ico' : 'image/x-icon',
//   '.jpg' : 'image/jpeg',
//   '.png' : 'image/png',
//   '.gif' : 'image/gif',
//   '.css' : 'text/css',
//   '.txt' : 'text/plain',
//   '.js' : 'text/javascript'
// };

exports.serveAssets = function(res, asset, callback) {
  // filename = path.basename(asset) || 'index.html';
  // var folder = (filename === 'index.html' || filename === 'styles.css') ? './public/' : '../archives/sites/';

  // //
  // var dotoffset = asset.url.lastIndexOf('.');
  // var mimetype = dotoffset == -1 ? 'text/plain' : mimetypes[asset.url.substr(dotoffset)];
  // mimetype = mimetype || 'text/html';

  // exports.headers['Content-Type'] = mimetype;

  // var filetype = filename.split('.')[1];
  // if (filetype === 'css') {
  //   this.headers['Content-Type'] = "text/css";
  // } else {
  //   this.headers['Content-Type'] = "text/html";
  // }
  // var that = this;


  //serve any static files
  //check if file requested exists in public folder
  var encoding = { 'encoding': 'utf8' };
  fs.readFile(archive.paths.siteAssets + asset, encoding, function (err, data) {
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, encoding, function (err, data) {
        if (err) {
          exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });


};



// As you progress, keep thinking about what helper functions you can put here!
exports.sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;

  response.writeHead(statusCode, headers);
  response.write(data);
  response.end();
};

exports.collectData = function (req, cb) {
  var data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    //var d2 = JSON.parse(data);
    console.log('data to be collected:', data);
    cb(data);
  });
};

exports.send404 = function (res) {
  exports.sendResponse(res, "nothing here", 404);
};

exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, { Location: location } );
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
