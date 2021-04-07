/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Bernie
 * @Date: 2021-03-29 17:51
 * @LastEditors: Bernie
 * @LastEditTime: 
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
