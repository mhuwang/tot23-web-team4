/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:23:46
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-11 17:21:52
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllNamespaces() {
  return request({
    url: baseUrl + '/namespaces/getAllNamespaces',
    method: 'get',
  })
}
export function getAllNamespaceName() {
  return request({
    url: baseUrl + '/namespaces/getAllNamespaceName',
    method: 'get',
  })
}

export function getNamespaceDetails(data) {
  return request({
    url: baseUrl + '/namespaces/getNamespaceDetails',
    method: 'get',
    params: {
      namespace: data,
    }
  })
}