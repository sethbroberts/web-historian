var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require("request");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

var encoding = { encoding: 'utf8' };
// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
   //read /Users/sethroberts/Desktop/HR/sprints/2015-10-web-historian/archives/sites.txt
  fs.readFile(exports.paths.list, encoding, function(err, data) {
    if (err) {
      // if file doesn't exist, create the file and re-write it
      console.log('File not found');
    } else {
      data = data.toString().split('\n');
      cb(data);
    }
  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(data) {
    cb(data.indexOf(url) > -1);
  });
};

exports.addUrlToList = function(url, cb){
  console.log('url to be added: ' + url);
  fs.appendFile(exports.paths.list, url, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Data appended to sites.txt');
    cb();
  });
};

exports.isUrlArchived = function(url, cb){
  fs.readFile(exports.paths.archivedSites + url, encoding, function (err, data) {
    if (err) {
      cb(false);
    } else {
      cb(true);
    }
  });
};

exports.downloadUrls = function(siteList, cb){
  siteList.forEach(function (url) {
    exports.isUrlArchived('/' + url, function (found) {
      if (!found) {
        console.log('from line 74:', url);
        request('http://' + url, function (err, response, body) {
          if (! err) {
            // console.log('request err is: ');
            // console.log(err);
            console.log(exports.paths.archivedSites + '/' + url);
            fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(error) {
              if (error) {
                console.log(error);
              } else {
                if (cb) {
                  cb();
                }
              }
            });
          }
        });
      }
    });
  });
};
