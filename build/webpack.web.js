const { resolve } = require('./helper')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = {
  // mode: 'production',
  watch: true,
  target: "web",
  entry: resolve('index.ts'),
  output: {
    path: resolve('dist'),
    filename: 'web-upload-file-lib.js',
    library: 'webUploadFileLib', //对外暴露的属性名
    libraryTarget:'window' // 挂载到对应的环境下 window['sunduanUtil']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts' ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  devtool: 'source-map'
}

module.exports = webpackConfig
