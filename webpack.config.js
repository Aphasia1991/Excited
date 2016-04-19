/*eslint-env node */
module.exports = Object.assign({
  entry: require('./entries'),
  output: {
    library: 'M[name]',
    libraryTarget: 'umd',
    filename: '[name].min.js',
    path: './dist',
  },
  externals: {
    'vue': 'Vue',
  },
}, require('./webpack.base'));
