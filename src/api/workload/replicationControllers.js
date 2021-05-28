/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:19
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-15 21:39:33
 */
import request from "@/utils/request";
let baseUrl = require("../api").baseurl;

export function getAllReplicationControllers(data) {
  return request({
    url: baseUrl + '/replicationControllers/getAllReplicationControllers',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getReplicationControllerByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/replicationControllers/getReplicationControllerByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}

export function deleteReplicationControllerByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/replicationControllers/deleteReplicationControllerByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getReplicationControllerYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/replicationControllers/getReplicationControllerYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getReplicationControllerResources(data) {
  return request({
    url :baseUrl + '/replicationControllers/getReplicationControllerResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getReplicationControllerLogs(data) {
  return request({
    url :baseUrl + '/replicationControllers/getReplicationControllerLogs',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
