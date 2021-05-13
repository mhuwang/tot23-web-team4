/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-02 12:46:51
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-12 22:24:50
 */
import request from '@/utils/request'
let baseUrl = require("./api").baseurl;

export function getAllEdgeNodes() {
  return request({
    url: baseUrl + '/edge/getAllEdgeNodes',
    method: 'get',
  })
}
export function getNodeByName(data) {
  return request({
    url: baseUrl + '/edge/getEdgeNodeByName',
    method: 'get',
    params: {
      nodeName: data,
    }
  })
}
export function getLogs(data) {
  return request({
    url: baseUrl + '/edge/getLogs',
    method: 'get',
    params: {
      podName: data.podName,
      nameSpace: data.nameSpace,
    }
  })
}
export function getAllDevices(data) {
  return request({
    url: baseUrl + '/customize/getCustomResourceDefinitionObjectListByName',
    method: 'get',
    params: {
      crdName: data,
    }
  })
}

export function initEdgeGraph(data) {
  return request({
    url: baseUrl + '/edge/initEdgeGraph',
    method: 'get',
  })
}
