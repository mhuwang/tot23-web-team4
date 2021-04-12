/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:23:44
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-12 10:49:28
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllServices(data) {
  return request({
    url: baseUrl + '/service/getAllServices',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function getServicesByNameAndNamespace(svc) {
  return request({
    url: baseUrl + '/service/getServiceByNameAndNamespace',
    method: 'get',
    params: {
      name: svc.name,
      namespace: svc.namespace
    }
  })
}

export function getServiceYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/service/getServiceYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.serviceName,
      namespace: data.serviceNamespace,
    }
  })
}

export function delServiceByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/service/delServiceByNameAndNamespace',
    method: 'get',
    params: {
      name: data.serviceName,
      namespace: data.serviceNamespace,
    }
  })
}

export function getEndpointBySvcNameAndNamespace(svc) {
  return request({
    url: baseUrl + '/service/getEndpointBySvcNameAndNamespace',
    method: 'get',
    params: {
      name: svc.name,
      namespace: svc.namespace
    }
  })
}

// export function getPodBySvcLabel(lab) {
//   return request({
//     url: baseUrl + '/service/getPodBySvcLabel',
//     method: 'get',
//     params: {
//       key: lab.name,
//       value: lab.namespace
//     }
//   })
// }