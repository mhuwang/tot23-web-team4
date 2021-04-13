/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:23:44
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-13 15:29:48
 */

import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllIngresses(data) {
  return request({
    url: baseUrl + '/ingresses/getAllIngresses',
    method: 'get',
  })
}

export function getIngressesByNameAndNamespace(svc) {
  return request({
    url: baseUrl + '/ingresses/getIngressByNameAndNamespace',
    method: 'get',
    params: {
      name: svc.name,
      namespace: svc.namespace
    }
  })
}

export function getIngressYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/ingresses/getIngressYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.ingressName,
      namespace: data.ingressNamespace,
    }
  })
}

export function delIngressByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/ingresses/delIngressByNameAndNamespace',
    method: 'get',
    params: {
      name: data.ingressName,
      namespace: data.ingressNamespace,
    }
  })
}
