const fs = require('fs');
const path = require('path');

const src = './src';
const dirMap = fs.readdirSync(src).filter(res => fs.statSync(path.join(src, res)).isDirectory());

module.exports = dirMap;
