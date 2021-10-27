const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
// const webpack = require('webpack');

module.exports = smp.wrap(
  merge(common, {
    entry: {
      app: path.resolve(__dirname, '../src/index.tsx'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      watchContentBase: false,
      liveReload: false,
      contentBase: path.join(__dirname, '../dist'),
      compress: true,
      port: 9003,
      hot: true,
    },
    plugins: [
      // 指定构建变量
      // new webpack.DefinePlugin({}),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../template/index.html'),
        filename: path.resolve(__dirname, '../dist/index.html'),
        chunks: ['app', 'common'],
      }),
    ],
  })
);
