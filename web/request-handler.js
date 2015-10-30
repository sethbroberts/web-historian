var url = require('url');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var httphelpers = require("./http-helpers.js");
// require more modules/folders here!
var fs = require('fs');

var actions = {
  'GET': function (req, res) {
    var urlObj = url.parse(req.url);
    var urlPath = urlObj.pathname;

    if (urlPath === '/') {
      urlPath = '/index.html';
    }
    httphelpers.serveAssets(res, urlPath);
  },
  'POST': function (req, res) {
    //write to /Users/sethroberts/Desktop/HR/sprints/2015-10-web-historian/archives/sites.txt
    httphelpers.collectData(req, function(data) {
      console.log(data);
      var urltopost = data.split('=')[1];
      // console.log('check if file is in list: ');
      // console.log(archive.isUrlInList(urltopost));
      archive.isUrlInList(urltopost, function(inList){
        if (inList) {
          archive.isUrlArchived(urltopost, function(exists){
            if (exists) {
              httphelpers.sendRedirect(res, archive.paths.archivedSites + '/' + urltopost );
            } else {
              httphelpers.sendRedirect(res, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(urltopost + '\n', function() {
            // archive.readListOfUrls(function(list) {
            //   archive.downloadUrls(list);
            // });
            httphelpers.sendRedirect(res, '/loading.html', 302);
          });
        }
      });




      // if (archive.isUrlInList(urltopost) {
      //   // if exist we should return loading.html
      //   // httphelpers.serveAssets(res, 'loading.html');
      //   // redirect user to loading.html
      //   //fs.readFile(archive.paths.siteAssets + asset, encoding, function (err, data) {
      //   //  if (err) {
      //   var encoding = { 'encoding': 'utf8' };
      //   fs.readFile(archive.paths.archivedSites + urltopost, encoding, function (err, content) {
      //     if (err) {
      //       //redirect to loading page
      //       httphelpers.sendRedirect(res, '/loading.html', 302);
      //     } else {
      //       httphelpers.serveAssets(res, archive.paths.archivedSites + urltopost);
      //     }
      //   });

      // } else {
      //   archive.addUrlToList(urltopost + '\n');
      //   httphelpers.sendRedirect(res, '/loading.html', 302);
      // }
    });
  }
};

exports.handleRequest = function (req, res) {
  //check if file exists
  //if it does, read data and attach to response

  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    httphelpers.send404(res);
  }


};


var readContent = function (filename, callback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
};


