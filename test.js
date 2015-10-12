#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var glob = require('glob');

var findComponents = require('./src/scanner.js');

program
  .version('0.0.1')
  .option('-s --src <file>', 'Source location', null, 'src')
  .parse(process.argv);

glob(program.src, function(er, files) {
  var output = {};
  for(var f in files) {
    output[files[f]] = findComponents(files[f]);
  }
  if(program.output) {
    fs.writeFileSync(program.output,
      JSON.stringify(output, null, 2));
  } else {
    console.log(JSON.stringify(output, null, 2));
  }
});
