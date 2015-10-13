var glob = require('glob');
var async = require('async');

var findComponents = require('./scanner.js');

module.exports = function(src, complete, error) {
  glob(src, function(er, files) {
    var output = {};
    async.each(files, function(file, done) {
      try {
        findComponents(file, function(found) {
          if(found.length > 0) {
            output[file] = found;
          }
          done();
        });
      } catch(e) {
        error(file, e);
      }
    }, function() {
      complete(output);
    });
  });
}
