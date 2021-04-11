/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:23:44
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-30 22:19:00
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllDeployments(data) {
  return request({
    url: baseUrl + '/deployments/getAllDeployments',
    method: 'get',
  })
}
export function getDeploymentByNameAndNamespace(dep) {
  return request({
    url: baseUrl + '/deployments/getDeploymentByNameAndNamespace',
    method: 'get',
    params: {
      name: dep.name,
      namespace: dep.namespace
    }
  })
}