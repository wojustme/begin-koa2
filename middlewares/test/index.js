'use strict';
/**
 * app.js---->工程启动文件
 * @author            xurenhe
 * @date              2016-12-01
 * @copyright         城云科技
 * @version           0.0.1
 */

export default (options) => {
  console.log(options);
  return (ctx, next) => {
    console.log('this begin')
    return next().then(() => {
      console.log('this end')
    });
  }
}
