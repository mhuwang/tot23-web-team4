/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-16 12:13:55
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-16 12:14:12
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function initClusterGraph(data) {
  return request({
    url: baseUrl + '/cluster/initClusterGraph',
    method: 'get',
  })
}