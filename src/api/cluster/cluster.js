/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-16 12:13:55
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-10 18:43:13
 */
import request from '@/utils/request'
let baseUrl = require("../api").baseurl;

export function initClusterGraph(data) {
  return request({
    url: baseUrl + '/cluster/initClusterGraph',
    method: 'get',
  })
}