/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:10:50
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-08 11:01:52
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