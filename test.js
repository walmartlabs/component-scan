#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var glob = require('glob');
var async = require('async');

var findComponents = require('./src/scanner.js');

program
  .version('0.0.1')
  .option('-s --src <file>', 'Source location', null, 'src')
  .parse(process.argv);

glob(program.src, function(er, files) {
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
      console.log('Error parsing: ' + files[f]);
    }
  }, function() {
    console.log(JSON.stringify(output, null, 2));
  });
});
