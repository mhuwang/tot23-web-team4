/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:23:46
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-26 13:29:45
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllNamespaces(data) {
  return request({
    url: baseUrl + '/namespaces/getAllNamespaces',
    method: 'get',
  })
}