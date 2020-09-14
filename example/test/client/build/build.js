
const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.web');
const { resolve } = require('./helper')
// const webpackConfigNode = require('./webpack.config.node')

rm(resolve('dist'), function(err) {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    if (stats.hasErrors()) {
      console.log(stats, 'has errors end');
    } else {
      console.log('wepback web-upload-file-lib test finish!')
    }
  })
})
