/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:47
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-31 14:42:43
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllPods(data) {
  return request({
    url: baseUrl + '/pods/getAllPods',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getPodsByNode(data) {
  return request({
    url: baseUrl + '/pods/getPodsByNode',
    method: 'get',
    params: {
      nodeName: data,
    }
  })
}
