#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');

var findComponentsBatch = require('./src/batch.js');

program
  .version('0.0.6')
  .option('-s --src <dir>', 'Source location', null, 'src')
  .option('-o --output <file>', 'Output file')
  .parse(process.argv);

findComponentsBatch(program.src + '/**/*.jsx', function(output) {
  if(program.output) {
    fs.writeFileSync(program.output,
      JSON.stringify(output, null, 2));
  } else {
    console.log(JSON.stringify(output, null, 2));
  }
}, function(file, e) {
  console.log("Error parsing "+file);
});
