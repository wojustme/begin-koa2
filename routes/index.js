'use strict';
/**
 * routes/index.js---->路由测试
 * @author            xurenhe
 * @date              2016-12-01
 * @copyright         城云科技
 * @version           0.0.1
 */
import route from 'koa-router'
var router = new route()


router.get('/', async (ctx, next) => {
  console.log(await ctx.fetchData({
    t: 'GET#http://localhost:8080/abc',
    a: 'GET#http://localhost:8080/xyz'
  }))
  ctx.body = 'this a users response!\n';
});
export default router
