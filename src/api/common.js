/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:10:50
 */
import request from '@/utils/request'
const baseUrl = require('./api').baseurl

export function changeResourceByYaml(data) {
  return request({
    url: baseUrl + '/common/changeResourceByYaml',
    method: 'post',
    data: {
      yaml: data,
    }
  })
}

export function getEventByInvolvedObjectUid(data) {
  return request({
    url: baseUrl + '/common/getEventByInvolvedObjectUid',
    method: 'get',
    params: {
      uid: data
    }
  })
}
