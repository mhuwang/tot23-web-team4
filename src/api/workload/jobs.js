/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: zqy
 * @LastEditTime: 2021.03.29 16:18
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
  // console.log(nameAndNamespace, "in api job.js")
  return request({
    url: baseUrl + '/jobs/getJobByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}
