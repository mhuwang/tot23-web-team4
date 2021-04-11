/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: zqy
 * @LastEditTime: 2021.03.29 16:18
 */
import request from "@/utils/request";
let baseUrl = "http://localhost:8081"

export function getAllDaemonSets(data) {
  return request({
    url: baseUrl + '/daemonSets/getAllDaemonSets',
    method: 'get',
  })
}
export function getDaemonSetByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/daemonSets/getDaemonSetByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}