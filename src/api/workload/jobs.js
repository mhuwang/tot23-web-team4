/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-11 21:05:56
 */
import request from "@/utils/request"
let baseUrl = "http://localhost:8081"

export function getAllJobs(data) {
  return request({
    url: baseUrl + '/jobs/getAllJobs',
    method: 'get',
  })
}

export function getJobByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/jobs/getJobByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}

export function deleteJobByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/jobs/deleteJobByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getJobYamlByNameAndNamespace(data) {
  return request({
    url :baseUrl + '/jobs/getJobYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}