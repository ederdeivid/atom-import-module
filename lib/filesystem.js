'use strict';
const fs = require('fs');
const {
    resolve,
    basename,
    extname,
    dirname
} = require('path');

/**
 *
 *
 * @param {String} dirname
 * @param {Object} options
 * @return {[String]}
 */

const readdir = (dir, { recursive = true, filter = () => true } = {}) => {
  return fs
          .readdirSync(dir)
          .map(filename => {
            const filePath = resolve(dir, filename);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
              if(dirname(filePath).endsWith('node_modules')) {
                return [filePath];
              }
              return recursive? readdir(filePath) : [];
            }
            else if (stat.isFile())
              return [filePath];
          })
          .reduce((files, e) => [...files, ...e], [])
          .filter(filter);
};

module.exports = {
  readdir
};
