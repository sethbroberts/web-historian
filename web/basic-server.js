var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var httphelpers = require("./http-helpers.js");
var url = require("url");

var routes = {
  '/': handler.handleRequest,
  '/styles.css': handler.handleRequest
};

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  var route = routes[pathname];
  if (route) {
    route(req, res);
  } else {
    //error response
    httphelpers.sendResponse(res, "nothing here", 404);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}


