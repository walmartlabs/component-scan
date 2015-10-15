#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _batchJs = require('./batch.js');

var _batchJs2 = _interopRequireDefault(_batchJs);

_commander2['default'].version('0.0.7').option('-s --src <dir>', 'Source location', null, 'src').option('-o --output <file>', 'Output file').parse(process.argv);

(0, _batchJs2['default'])(_commander2['default'].src + '/**/*.jsx', function (output) {
  if (_commander2['default'].output) {
    _fs2['default'].writeFileSync(_commander2['default'].output, JSON.stringify(output, null, 2));
  } else {
    console.log(JSON.stringify(output, null, 2));
  }
}, function (file, e) {
  console.log("Error parsing " + file);
});