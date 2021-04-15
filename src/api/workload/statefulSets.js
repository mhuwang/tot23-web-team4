/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:19
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-13 21:46:19
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllStatefulSets(data) {
  return request({
    url: baseUrl + '/statefulSets/getAllStatefulSets',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function getStatefulSetByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/statefulSets/getStatefulSetByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}
deleteStatefulSetByNameAndNamespace, getStatefulSetYamlByNameAndNamespace
export function deleteStatefulSetByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/statefulSets/deleteStatefulSetByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getStatefulSetYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/statefulSets/getStatefulSetYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}