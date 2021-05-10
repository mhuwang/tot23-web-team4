/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date:
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-10 18:43:34
 */
import request from '@/utils/request'
let baseUrl = require("../api").baseurl;

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