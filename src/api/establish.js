/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021-04-26 12:23:55
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-29 22:56:08
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function createResourceByFile(data) {
    return request({
        url: baseUrl + "/establish/file2",
        method: 'post',
        data: data
    })
}
export function createPodFromYamlFile(data) {
    console.log(data)
    return request({
        url: baseUrl + "/pods/createPodFromYamlFile",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'//可以不加 说明表单里传的是文件
        },
        data: data
    })
}