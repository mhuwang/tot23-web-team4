/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Bernie
 * @Date: 2021-03-29 17:51
 * @LastEditors: Bernie
 * @LastEditTime: 2021-04-20 16:47:06
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
  console.log(customResourceDefinitionName);
  return request({
    url: baseUrl + '/customize/getCustomResourceDefinitionObjectListByName',
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
    method: 'get',
    params: {
      crdName: name,
      
    }
  })
}
export function getObjectByNameAndNamespace(objectDetails) {
  return request({
    url: baseUrl + '/customize/getCustomResourceDefinitionObjectByCrdNameAndObjNameAndNamespace',
    method: 'get',
    params: {
      crdName: objectDetails.crdName,
      objName: objectDetails.objectName,
      nameSpace: objectDetails.objectNamespace,
      
    }
  })
}
//getObjectYamlByName
export function getObjectYamlByName(objectDetails) {
  return request({
    url: baseUrl + '/customize/getObjectYamlByName',
    method: 'get',
    params: {
      crdName: objectDetails.crdName,
      objName: objectDetails.objectName,
      nameSpace: objectDetails.objectNamespace,
      
    }
  })
}
//delObject
export function delObject(objectDetails) {
  return request({
    url: baseUrl + '/customize/deleteCustomResourceDefinitionObject',
    method: 'get',
    params: {
      crdName: objectDetails.crdName,
      objName: objectDetails.objectName,
      nameSpace: objectDetails.objectNamespace,
      
    }
  })
}