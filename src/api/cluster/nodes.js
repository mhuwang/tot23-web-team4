/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-25 20:42:46
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-10 18:45:36
 */
import request from '@/utils/request'
let baseUrl = require("../api").baseurl;

export function getAllNodes(data) {
  return request({
    url: baseUrl + '/nodes/getAllNodes',
    method: 'get',
  })
}
export function getNodeByName(data) {
  return request({
    url: baseUrl + '/nodes/getNodeByName',
    method: 'get',
    params: {
      nodeName: data,
    }
  })
}

export function getUsageRecentTwenty(data) {
  return request({
    url: baseUrl + '/nodes/getUsageRecentTwenty',
    method: 'get',
    params: {
      nodeName: data,
    },
  })
}

export function getNodeYamlByName(data) {
  return request({
    url: baseUrl + '/nodes/getNodeYamlByName',
    method: 'get',
    params: {
      nodeName: data,
    }
  })
}