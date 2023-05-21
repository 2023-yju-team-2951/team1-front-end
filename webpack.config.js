const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve('public/assets/js/dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
