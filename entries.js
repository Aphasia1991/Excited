const fs = require('fs');
const path = require('path');

const src = './src';
const list = fs.readdirSync(src).filter(res => fs.statSync(path.join(src, res)).isDirectory());
const entries = {};

list.forEach(e => {
  entries[e] = src + '/' + e;
});

module.exports = entries;
