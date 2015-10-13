#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var findComponentsBatch = require('./src/batch.js');

program
  .version('0.0.6')
  .option('-s --src <file>', 'Source location', null, 'src')
  .parse(process.argv);

findComponentsBatch(program.src, function(er, files) {
  console.log(JSON.stringify(output, null, 2));
}, function(file, e) {
  console.log("Error parsing "+file);
});
