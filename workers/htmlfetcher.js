// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// check in the sites.txt file
// see whether this site exists in sites folder
// if exists, do nothing
// if not, go get the webpage and save it in sites folder

var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function (list) {
  archive.downloadUrls(list);
});
