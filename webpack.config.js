/*eslint-env node */
const dirMap = require('./entries');
const creatLib = (libName, fileName) => ({
  entry: `./src/${libName}`,
  output: {
    library: libName,
    libraryTarget: 'umd',
    filename: `${fileName}.min.js`,
    path: './dist',
  },
  externals: {
    'vue': 'Vue',
  }
});
const libMap = [];

dirMap.forEach((dirName) => {
  const lib = Object.assign(creatLib(dirName, dirName.toLowerCase()), require('./webpack.base'));
  libMap.push(lib);
});

module.exports = libMap;
