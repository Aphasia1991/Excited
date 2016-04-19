/*eslint-env node */
const cssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcssFlexFallback = require('postcss-flex-fallback');
const postcssPx2rem = require('postcss-px2rem');

module.exports = {
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel' },
      { test: /\.(png|svg)$/, loader: 'url?limit=10000'},
    ],
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
    },
    autoprefixer: false,
    postcss: [
      postcssNested(),
      cssnext({ browsers: ['Android >= 4.0', 'iOS >= 7.0'] }),
      postcssFlexFallback(),
      postcssPx2rem({remUnit: 75}),
    ],
  },
};
