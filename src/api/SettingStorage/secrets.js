/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date:
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-28 10:05:22
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllSecrets(data) {
  return request({
    url: baseUrl + '/secrets/getAllSecrets',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getSecretByNameAndNamespace(ser) {
  return request({
    url: baseUrl + '/secrets/getSecretByNameAndNamespace',
    method: 'get',
    params: {
      name: ser.name,
      namespace: ser.namespace
    }
  })
}
export function getSecretYamlByNameAndNamespace(ser) {
  //console.log("apis", ser);
  return request({
    url: baseUrl + '/secrets/getSecretYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: ser.secretName,
      namespace: ser.secretNamespace,
    }
  })
}
export function delSecretByNameAndNamespace(ser) {
  return request({
    url: baseUrl + '/secrets/delSecretByNameAndNamespace',
    method: 'get',
    params: {
      name: ser.name,
      namespace: ser.namespace,
    }
  })
}
export function getAllSecretsName(data) {
  return request({
    url: baseUrl + '/secrets/getAllSecretsName',
    method: 'get',
    params: {
      namespace: data,
    }
  })
}