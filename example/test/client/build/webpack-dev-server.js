/**
 * @file 本地开发环境下的 node 脚本，这种方式是通过命令行传参数
 * @author jamesjianpeng
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

/**
 * 为热更新， 启动一个 本地 http 服务
 * @param {object} devConf
 * @returns void
 */
exports.devScript = function(devConf) {
    webpackDevServer.addDevServerEntrypoints(devConf, devConf.devServer);
    const compiler = webpack(devConf);
    new webpackDevServer(compiler, devConf.devServer)
      .listen(devConf.devServer.port);
    console.log(`http://${devConf.devServer.host}:${devConf.devServer.port}`)
}
