#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var glob = require('glob');
var async = require('async');

var findComponents = require('./src/scanner.js');

program
  .version('0.0.1')
  .option('-s --src <dir>', 'Source location', null, 'src')
  .option('-o --output <file>', 'Output file')
  .parse(process.argv);

glob(program.src + '/**/*.jsx', function(er, files) {
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
    if(program.output) {
      fs.writeFileSync(program.output,
        JSON.stringify(output, null, 2));
    } else {
      console.log(JSON.stringify(output, null, 2));
    }
  });
});
