/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 13:50:29
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 13:51:02
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllClusterRoles(data) {
  return request({
    url: baseUrl + '/clusterRoles/getAllClusterRoles',
    method: 'get',
  })
}