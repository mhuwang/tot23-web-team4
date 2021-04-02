/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:16
 * @LastEditors: zqy
 * @LastEditTime: 2021.03.29 16:16
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllCronJobs(data) {
  return request({
    url: baseUrl + '/cronJobs/getAllCronJobs',
    method: 'get',
  })
}

export function getCronJobByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/cronJobs/getCronJobByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}
