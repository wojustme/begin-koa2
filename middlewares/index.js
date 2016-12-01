'use strict';
/**
 * middlewares/index.js---->各种中间件集合，导出格式对象以文件夹名为键
 * @author            xurenhe
 * @date              2016-12-01
 * @copyright         城云科技
 * @version           0.0.1
 */
const fs = require('fs');
const curPath = __dirname;

fs.readdirSync(curPath).forEach((item) => {
  let filePath = `${curPath}/${item}/index.js`;
  if (fs.existsSync(filePath)) {
    exports[item] = require(filePath)
  }
})
