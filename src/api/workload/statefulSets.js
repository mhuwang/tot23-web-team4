/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:19
 * @LastEditors: zqy
 * @LastEditTime: 2021.03.29 16:19
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function getAllStatefulSets(data) {
  return request({
    url: baseUrl + '/statefulSets/getAllStatefulSets',
    method: 'get',
  })
}
