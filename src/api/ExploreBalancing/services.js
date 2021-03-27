/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:23:44
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 14:24:21
 */

import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllServices(data) {
  return request({
    url: baseUrl + '/service/getAllServices',
    method: 'get',
  })
}