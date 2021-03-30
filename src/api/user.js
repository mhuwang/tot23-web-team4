/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-19 16:14:56
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-30 17:08:39
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function login(data) {
  return request({
    url: baseUrl + '/user/login',
    method: 'get',
    params: data,
  })
}

export function getInfo(token) {
  return request({
    url: baseUrl + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: baseUrl + '/user/logout',
    method: 'get'
  })
}

export function getUsers(queryInfo) {
    
  return request({
    url: baseUrl + '/user/getUsers',
    method: 'get',
    params: {
      queryInfo: queryInfo.queryInfo,
      pageStart: queryInfo.pageStart,
      pageSize: queryInfo.pageSize
    }
  })
}
