/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:23:44
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-16 22:27:15
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllDeployments(data) {
  return request({
    url: baseUrl + '/deployments/getAllDeployments',
    method: 'get',
    params: {
      namespace: data
    }
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

export function getDeploymentYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/deployments/getDeploymentYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function deleteDeploymentByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/deployments/deleteDeploymentByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getDeploymentResources(data) {
  return request({
    url: baseUrl + '/deployments/getDeploymentResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
getDeploymentResources