/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:10:50
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-12 21:22:34
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function changeResourceByYaml(data) {
  console.log("yaml",data);
    return request({
      url: baseUrl + '/common/changeResourceByYaml',
      method: 'post',
      data: {
        pod: data,
      }
    })
  }
export function changeServicesByYaml(data) {
    return request({
      url: baseUrl + '/common/changeServicesByYaml',
      method: 'post',
      data: {
        service: data,
      }
    })
  }