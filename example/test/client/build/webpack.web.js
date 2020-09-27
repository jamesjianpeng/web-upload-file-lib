const { resolve } = require('./helper')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  mode: 'production',
  watch: true,
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: resolve('index.html')
      }
    )
  ],
  devtool: 'source-map'
}

module.exports = webpackConfig
