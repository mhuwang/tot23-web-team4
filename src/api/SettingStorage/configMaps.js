/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 14:24:21
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllConfigMaps(data) {
  return request({
    url: baseUrl + '/configMaps/getAllConfigMaps',
    method: 'get',
  })
}