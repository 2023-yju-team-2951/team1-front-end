const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',

  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  watchOptions: {
    poll: true,
    ignored: '/node_modules/',
  },

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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new Dotenv()],
};
