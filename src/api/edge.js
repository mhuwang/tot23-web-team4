/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-02 12:46:51
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-02 13:38:12
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllEdgeNodes() {
  return request({
    url: baseUrl + '/edge/getAllEdgeNodes',
    method: 'get',
  })
}
export function getNodeByName(data) {
  return request({
    url: baseUrl + '/edge/getEdgeNodeByName',
    method: 'get',
    params: {
      nodeName: data,
    }
  })
}