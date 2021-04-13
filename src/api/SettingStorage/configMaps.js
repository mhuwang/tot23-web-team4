/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date:
 * @LastEditors: Anna667
 * @LastEditTime: 
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllConfigMaps(data) {
  return request({
    url: baseUrl + '/configMaps/getAllConfigMaps',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getConfigMapByNameAndNamespace(con) {
  return request({
    url: baseUrl + '/configMaps/getConfigMapByNameAndNamespace',
    method: 'get',
    params: {
      name: con.name,  //不能改
      namespace: con.namespace
    }
  })
}
export function getConfigMapYamlByNameAndNamespace(con) {
  //console.log("apis", con);
  return request({
    url: baseUrl + '/configMaps/getConfigMapYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: con.configMapName,
      namespace: con.configMapNamespace,
    }
  })
}
export function delConfigMapByNameAndNamespace(con) {
  return request({
    url: baseUrl + '/configMaps/delConfigMapByNameAndNamespace',
    method: 'get',
    params: {
      name: con.name,
      namespace: con.namespace,
    }
  })
}