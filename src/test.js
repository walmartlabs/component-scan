#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';
import findComponentsBatch from './batch.js';

program
  .version('0.0.7')
  .option('-s --src <file>', 'Source location', null, 'src')
  .parse(process.argv);

findComponentsBatch(program.src, (er, files) => {
  console.log(JSON.stringify(output, null, 2));
}, (file, e) => {
  console.log("Error parsing "+file);
});
