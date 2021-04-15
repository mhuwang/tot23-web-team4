/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:23:46
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-14 20:40:57
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

export function getNamespaceYamlByName(data) {
  return request({
    url: baseUrl + '/namespaces/getNamespaceYamlByName',
    method: 'get',
    params: {
      namespace: data,
    }
  })
}

export function deleteNamespaceByName(data) {
  return request({
    url: baseUrl + '/namespaces/deleteNamespaceByName',
    method: 'get',
    params: {
      namespace: data,
    }
  })
}