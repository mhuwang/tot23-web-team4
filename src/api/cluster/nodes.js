/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-25 20:42:46
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-02 12:47:06
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllNodes(data) {
  return request({
    url: baseUrl + '/nodes/getAllNodes',
    method: 'get',
  })
}
export function getNodeByName(data) {
  return request({
    url: baseUrl + '/nodes/getNodeByName',
    method: 'get',
    params: {
      nodeName: data,
    }
  })
}
export function getUsageRecentTwenty(data) {
  return request({
    url: baseUrl + '/nodes/getUsageRecentTwenty',
    method: 'get',
    params: {
      nodeName: data,
    },
  })
}