'use strict';
/**
 * app.js---->工程启动文件
 * @author            xurenhe
 * @date              2016-12-01
 * @copyright         城云科技
 * @version           0.0.1
 */

import Koa from 'koa'
import router from 'koa-router'
import views from 'koa-views'
import co from 'co'
import convert from 'koa-convert'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

// 自己定义中间件
import { test, dataProxy } from './middlewares/'

// 路由信息
import index from './routes/index'

const app = new Koa()

app.use(dataProxy())

// 生成cookie使用
app.keys = ['im a newer secret', 'i like turtle'];
// 官方中间件
app.use(convert(new bodyparser()))
app.use(convert(json()))
app.use(convert(logger()))
app.use(convert(require('koa-static')(__dirname + '/public')))
app.use(convert(views(__dirname + '/public', {
  extension: 'html'
})))

// 路由配置
var routers = new router()
routers.use('/', index.routes(), index.allowedMethods())
// 使用路由中间件
app.use(routers.routes(), routers.allowedMethods())


app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
})

export default app
