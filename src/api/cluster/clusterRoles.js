/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 13:50:29
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-12 15:45:49
 */
import request from '@/utils/request'
let baseUrl = require("../api").baseurl;

export function getAllClusterRoles(data) {
  return request({
    url: baseUrl + '/clusterRoles/getAllClusterRoles',
    method: 'get',
  })
}
export function getClusterRoleDetails(data) {
  return request({
    url: baseUrl + '/clusterRoles/getClusterRoleDetails',
    method: 'get',
    params: {
      clusterRole: data,
    }
  })
}

export function getClusterRoleYamlByName(data) {
  return request({
    url: baseUrl + '/clusterRoles/getClusterRoleYamlByName',
    method: 'get',
    params: {
      clusterRole: data,
    }
  })
}
export function delClusterRoleByName(data) {
  return request({
    url: baseUrl + '/clusterRoles/delClusterRoleByName',
    method: 'get',
    params: {
      clusterRole: data,
    }
  })
}