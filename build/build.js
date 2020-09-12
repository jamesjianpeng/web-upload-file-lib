
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
      console.log('wepback web-upload-file-lib finish!')
    }
  })
})

// rm(path.resolve(__dirname, '../dist-node'), function (err) {
//   if (err) throw err
//   console.log(webpackConfigNode)
//   webpack(webpackConfigNode, function (err, stats) {
//     if (err) throw err
//     if (stats.hasErrors()) {
//       console.log(stats, 'has errors end');
//     }
//     console.log('wepback sunduan-util-node finish!')
//   })
// })

/**
 *
 * 1. package.json 配置 “build”: "node build/build.js"
 * 2. mkdir build && cd build && touch build && touch webpack.config.js
 * 3. 写启动 build 的代码， 写配置 webpack.config.js
 * 4. test
 *
 */
