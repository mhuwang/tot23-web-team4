/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-13 20:09:11
 */
import request from "@/utils/request";
let baseUrl = "http://localhost:8081"

export function getAllReplicaSets(data) {
  return request({
    url: baseUrl + '/replicaSets/getAllReplicaSets',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function getReplicaSetByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/replicaSets/getReplicaSetByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
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