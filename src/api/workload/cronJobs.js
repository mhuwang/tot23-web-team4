/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-10 18:44:22
 */
import request from '@/utils/request'
let baseUrl = require("../api").baseurl;

export function getAllCronJobs(data) {
  return request({
    url: baseUrl + '/cronJobs/getAllCronJobs',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function getCronJobByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/cronJobs/getCronJobByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function deleteCronJobByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/cronJobs/deleteCronJobByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getCronJobYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/cronJobs/getCronJobYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getCronJobResources(data) {
  // console.log(data, "in api");
  return request({
    url :baseUrl + '/cronJobs/getCronJobResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}