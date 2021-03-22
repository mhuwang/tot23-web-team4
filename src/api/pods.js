/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:47
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-22 17:21:39
 */
import request from '@/utils/request'
import axios from "axios"
import { get } from './httpconfig'
let baseUrl = "http://localhost:8081"

export function getAllPods(data) {
  return request({
    url: baseUrl + '/pods/getAllPods',
    method: 'get',
  })
}
