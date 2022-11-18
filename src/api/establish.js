/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021-04-26 12:23:55
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-11-01 14:33:17
 */
import request from '@/utils/request'
const baseUrl = require('./api').baseurl

export function createPodFromForm(data) {
  return request({
    url: baseUrl + '/establish/createPodFromForm',
    method: 'post',
    data: data
  })
}
export function createPodFromYamlFile(data) {
  return request({
    url: baseUrl + '/establish/createPodFromYamlFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'// 可以不加 说明表单里传的是文件
    },
    data: data
  })
}

export function createResourceByYaml(data) {
  return request({
    url: baseUrl + '/establish/createResourceByYaml',
    method: 'post',
    data: {
      yaml: data,
    }
  })
}
