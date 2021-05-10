/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-15 20:47:27
 */
import request from "@/utils/request";
let baseUrl = require("../api").baseurl;

export function getAllReplicaSets(data) {
  return request({
    url: baseUrl + '/replicaSets/getAllReplicaSets',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function getReplicaSetByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/replicaSets/getReplicaSetByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function deleteReplicaSetByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/replicaSets/deleteReplicaSetByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getReplicaSetYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/replicaSets/getReplicaSetYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getReplicaSetResources(data) {
  return request({
    url :baseUrl + '/replicaSets/getReplicaSetResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}