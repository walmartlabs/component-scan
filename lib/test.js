#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _batchJs = require('./batch.js');

var _batchJs2 = _interopRequireDefault(_batchJs);

_commander2['default'].version('0.0.7').option('-s --src <file>', 'Source location', null, 'src').parse(process.argv);

(0, _batchJs2['default'])(_commander2['default'].src, function (output) {
  console.log(JSON.stringify(output, null, 2));
}, function (file, e) {
  console.log("Error parsing " + file);
});