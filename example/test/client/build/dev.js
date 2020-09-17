/**
 * @file 把需要用到的 configuration 都引进来，根据命令行的传参数去区分启动的服务是为某个项目服务
 * @author jamesjianpeng
 */
const { merge } = require('webpack-merge');
const devConf = require('./webpack.dev');
const webConf = require('./webpack.web')
const { devScript } = require('./webpack-dev-server');

devScript(merge(webConf, devConf))