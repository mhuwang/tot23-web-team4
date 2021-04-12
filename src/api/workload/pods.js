/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:47
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-11 16:50:34
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
export function getPodByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/getPodByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace,
    }
  })
}

export function getPodYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/getPodYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace,
    }
  })
}
export function delPodByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/delPodByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace,
    }
  })
}
