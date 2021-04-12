/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:10:50
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-11 21:04:55
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function changeResourceByYaml(data) {
    return request({
      url: baseUrl + '/common/changeResourceByYaml',
      method: 'post',
      data: {
        pod: data,
      }
    })
  }