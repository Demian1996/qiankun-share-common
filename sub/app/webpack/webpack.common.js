const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { name } = require('../package.json');

module.exports = {
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    library: `${name}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules([\\]+|\/)+(?!common)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
      },
    },
  },
};
