'use strict';
/**
 * utils/strHelper.js---->JSON数据代理
 * @author            xurenhe
 * @date              2016-12-01
 * @copyright         城云科技
 * @version           0.0.1
 */


/**
 * 分割字符串，并去空格
 * @param     {[type]}   str       [description]
 * @param     {[type]}   separator 分隔符
 * @return    {[type]}             [description]
 * @author xurenhe
 * @date      2016-12-01
 * @copyright 城云科技
 * @version   0.0.1
 */
export const splitTrimStr = (str, separator) => {
  let strArr = str.split(separator)
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = trimBA(strArr[i])
  }
  return strArr
}

/**
 * 去除前后空格
 * @param     {[type]}   str [description]
 * @return    {[type]}       [description]
 * @author xurenhe
 * @date      2016-12-01
 * @copyright 城云科技
 * @version   0.0.1
 */
export const trimBA = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
