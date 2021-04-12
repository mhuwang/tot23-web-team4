/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Bernie
 * @Date: 2021-03-29 17:51
 * @LastEditors: Bernie
 * @LastEditTime: 2021-04-12 10:16:19
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getCustomResourceDefinition(data) {
  return request({
    url: baseUrl + '/customize/getCustomResourceDefinition',
    method: 'get',
  })
}
export function getCustomResourceDefinitionByName(customResourceDefinitionName) {
  return request({
    url: baseUrl + '/customize/getCustomResourceDefinitionByName',
    method: 'get',
    params: {
      name: customResourceDefinitionName,
    }
  })
}
//getCustomResourceDefinitionObjectListbyName
export function getCustomResourceDefinitionObjectListbyName(customResourceDefinitionName) {
  return request({
    url: baseUrl + '/customize/getCustomResourceDefinitionObjectListbyName',
    method: 'get',
    params: {
      crdName: customResourceDefinitionName,
    }
  })
  
}
//getCrdYamlByName
export function getCrdYamlByName(name) {
  return request({
    url: baseUrl + '/customize/getCrdYamlByName',
    method: 'get',
    params: {
      crdName: name,
    }
  })
  
}
//delCrd
export function delCrd(name) {
  return request({
    url: baseUrl + '/customize/deleteCustomResourceDefinition',
    method: 'del',
    params: {
      crdName: name,
    }
  })
  
}
