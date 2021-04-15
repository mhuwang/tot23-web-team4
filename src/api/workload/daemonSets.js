/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-13 20:26:54
 */
import request from "@/utils/request";
let baseUrl = "http://localhost:8081"

export function getAllDaemonSets(data) {
  return request({
    url: baseUrl + '/daemonSets/getAllDaemonSets',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function getDaemonSetByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/daemonSets/getDaemonSetByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}

export function deleteDaemonSetByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/daemonSets/deleteDaemonSetByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getDaemonSetYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/daemonSets/getDaemonSetYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}