#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';

import findComponentsBatch from './batch.js';

program
  .version('0.0.7')
  .option('-s --src <dir>', 'Source location', null, 'src')
  .option('-o --output <file>', 'Output file')
  .parse(process.argv);

findComponentsBatch(program.src + '/**/*.jsx', (output) => {
  if(program.output) {
    fs.writeFileSync(program.output,
      JSON.stringify(output, null, 2));
  } else {
    console.log(JSON.stringify(output, null, 2));
  }
}, (file, e) => {
  console.log("Error parsing "+file);
});
