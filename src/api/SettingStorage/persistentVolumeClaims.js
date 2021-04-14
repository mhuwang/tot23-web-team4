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

export function getAllPVC(data) {
  return request({
    url: baseUrl + '/persistentVolumeClaims/getAllPVC',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getPVCByNameAndNamespace(per) {
  return request({
    url: baseUrl + '/persistentVolumeClaims/getPVCByNameAndNamespace',
    method: 'get',
    params: {
      name: per.name, //不能改
      namespace: per.namespace
    }
  })
}
export function getPVCYamlByNameAndNamespace(per) {
  //console.log("apis", per);
  return request({
    url: baseUrl + '/persistentVolumeClaims/getPVCYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: per.persistentVolumeClaimName,
      namespace: per.persistentVolumeClaimNamespace,
    }
  })
}
export function delPVCByNameAndNamespace(per) {
  return request({
    url: baseUrl + '/persistentVolumeClaims/delPVCByNameAndNamespace',
    method: 'get',
    params: {
      name: per.name,
      namespace: per.namespace,
    }
  })
}