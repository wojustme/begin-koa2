'use strict';
/**
 * middlewares/dataProxy/index.js---->JSON数据代理
 * @author            xurenhe
 * @date              2016-12-01
 * @copyright         城云科技
 * @version           0.0.1
 */

import fetch from 'node-fetch'
import { splitTrimStr } from '../../utils/strHelper'
import { isEmpty } from '../../utils/objHelper'

/**
 * 数据代理
 * @param     {[type]}   options app使用中间件时初始化参数
 * @return    {[type]}           [description]
 * @author xurenhe
 * @date      2016-12-01
 * @copyright 城云科技
 * @version   0.0.1
 */
export default (options) => (ctx, next) => {
  Object.assign(ctx, {
    fetchData: fetchData
  })
  return next()
}

/**
 * 拉取后台数据
 * @param     {[type]}   proxyApi ...:...  ====> POST/GET/DELETE/PUT#http://loalhost:8080
 * @return    {Promise}       以对象形式返回数据结果
 * @author xurenhe
 * @date      2016-12-01
 * @copyright 城云科技
 * @version   0.0.1
 */
let fetchData = async (proxyApi) => {
  let rd = undefined
  let backData = {}
  if (isEmpty(proxyApi)) {
    throw new Error(`The args of dataProxy do not allow empty arg`);
  }
  switch (typeof proxyApi) {
    case 'string':
      rd = {
        backData: proxyApi
      }
      break;
    case 'object':
      rd = proxyApi
      break;
    default:
      throw new Error(`The middlewares of dataProxy need proxyApi' type which is string or object.`);
  }

  let rdKeys = Object.keys(rd)
  let rdLen = rdKeys.length
  let promiseArr = new Array(rdLen)
  let itemArr = new Array(rdLen)
  let i = 0
  rdKeys.map(
    elem => {
      let fetchStr = rd[elem]
      let fetchArr = splitTrimStr(fetchStr, '#')
      if (fetchArr.length != 2) {
        throw new Error('The middlewares of dataProxy need two args...');
      }
      let method = fetchArr[0]
      let path = fetchArr[1]
      promiseArr[i] = fetch(path, {
        method
      }).then((res) => {
        return res.text();
      }).then((body) => {
        return body;
      })
      itemArr[i] = elem
      i++
    }
  )
  let dataList = await Promise.all(promiseArr).then(values => {
    return values
  })
  for (let i = 0; i < rdLen; i++) {
    backData[itemArr[i]] = dataList[i]
  }
  return backData
}
