/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-29 11:17:21
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllPVC(data) {
  return request({
    url: baseUrl + '/persistentVolumeClaims/getAllPVC',
    method: 'get',
  })
}
export function getPVCByNameAndNamespace(per) {
  return request({
    url: baseUrl + '/persistentVolumeClaims/getPVCByNameAndNamespace',
    method: 'get',
    params: {
      name: per.name,
      namespace: per.namespace
    }
  })
}