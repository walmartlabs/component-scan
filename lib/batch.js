'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _scannerJs = require('./scanner.js');

var _scannerJs2 = _interopRequireDefault(_scannerJs);

exports['default'] = function (src, complete, error) {
  (0, _glob2['default'])(src, function (er, files) {
    var output = {};
    _async2['default'].each(files, function (file, done) {
      try {
        (0, _scannerJs2['default'])(file, function (found) {
          if (found.length > 0) {
            output[file] = found;
          }
          done();
        });
      } catch (e) {
        error(file, e);
      }
    }, function () {
      complete(output);
    });
  });
};

module.exports = exports['default'];