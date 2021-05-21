/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-05-16 12:41:19
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-17 15:28:04
 */
import request from '@/utils/request'
let baseUrl = require("./api").baseurl;

export function getAllImages() {
    return request({
        url: baseUrl + '/images/getAllImages',
        method: 'get',
    })
}
export function getImageById(id) {
    return request({
        url: baseUrl + '/images/getImageById',
        method: 'get',
        params: {
            id: id
        }
    })
}
export function delImage(id) {
    return request({
        url: baseUrl + '/images/delImage',
        method: 'get',
        params: {
            id: id
        }
    })
}