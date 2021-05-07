/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021-04-26 12:23:55
 * @LastEditors: zqy
 * @LastEditTime: 2021-05-07 22:15:13
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

export function createPodFromForm(data) {
    console.log(data);
    return request({
        url: baseUrl + "/establish/createPodFromForm",
        method: 'post',
        data: data
    })
}
export function createPodFromYamlFile(data) {
    console.log(data)
    return request({
        url: baseUrl + "/establish/createPodFromYamlFile",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'//可以不加 说明表单里传的是文件
        },
        data: data
    })
}