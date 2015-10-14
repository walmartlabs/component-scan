import glob from 'glob';
import async from 'async';

import findComponents from './scanner.js';

export default (src, complete, error) => {
  glob(src, (er, files) => {
    let output = {};
    async.each(files, (file, done) => {
      try {
        findComponents(file, (found) => {
          if(found.length > 0) {
            output[file] = found;
          }
          done();
        });
      } catch(e) {
        error(file, e);
      }
    }, () => {
      complete(output);
    });
  });
}
