/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:19
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-10 18:43:59
 */
import request from '@/utils/request'
let baseUrl = require("../api").baseurl;

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

export function getStatefulSetResources(data) {
  console.log(data, "in api")
  return request({
    url :baseUrl + '/statefulSets/getStatefulSetResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}