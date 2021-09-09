/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021-09-05 7:23:55
 * @LastEditors: zqy
 * @LastEditTime: 2021-09-5 21:26:16
 */
import request from '@/utils/request'
const baseUrl = require('./api').baseurl

export function autoExpandShrinkDeployment (data) {
  return request({
    url: baseUrl + '/loadForecasting/autoExpandShrinkDeployment',
    method: 'get',
    params: {
        name: data.name,
        namespace: data.namespace,
        suspend: data.suspend
    }
  })
}
// export function createPodFromYamlFile(data) {
//   console.log(data)
//   return request({
//     url: baseUrl + '/establish/createPodFromYamlFile',
//     method: 'post',
//     headers: {
//       'Content-Type': 'multipart/form-data'// 可以不加 说明表单里传的是文件
//     },
//     data: data
//   })
// }