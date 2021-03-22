/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-18 11:11:57
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-20 17:22:48
 */

import { post, get } from './httpconfig'

// 请求 url
const baseurl = 'http://localhost:8081'
export default {
  
  // 登录接口，判断用户名和密码
  login(params) {
    return get(`${baseurl}/user/login`,params)
  },
  getUsers(params) {
    return get(`${baseurl}/user/getUsers`,params)
  },
  delSwiper(params) {
    return get(`${baseurl}/home/delSwiper`, params)
  },
  uploadSwiper(params) {
    return post(`${baseurl}/home/changeSwiper`, params)
  },

  getConsultantList(params) {
    return post(baseurl + '/home/getConsultantList', params)
  },
  changeEap(params) {
    return post(baseurl + '/home/changeEap', params)
  },
  // 首页-心理测试管理
  // 获取心理测试列表
  getHomePsyTest() {
    return get(baseurl + '/home/getHomePsyTest')
  },
  // 删除心理测试
  delHomePsyTest(params) {
    return get(baseurl + '/home/delHomePsyTest', params)
  },
  // 添加新测试
  addHomePsyTest(params) {
    return get(baseurl + '/home/addHomePsyTest', params)
  },
  // 首页-咨询师管理
  // 获取首页咨询师
  getHomeConsultant() {
    return get(baseurl + '/home/getHomeConsultant')
  },
  // 添加咨询师
  addHomeConsultant(params) {
    return get(baseurl + '/home/addHomeConsultant', params)
  },
  // 删除咨询师
  delHomeConsultant(params) {
    return get(baseurl + '/home/delHomeConsultant', params)
  },

  // 首页-线上课程管理
  // 获取线上课程列表
  getHomeCourse() {
    return get(baseurl + '/home/getHomeCourse')
  },
  // 添加线上课程
  addHomeCourse(params) {
    return get(baseurl + '/home/addHomeCourse', params)
  },
  // 删除线上课程
  delHomeCourse(params) {
    return get(baseurl + '/home/delHomeCourse', params)
  },

  // 发现-心理测试管理
  // 获取心理测试列表
  getTestList() {
    return get(baseurl + '/discover/getPsyTestList')
  },
  // 删除心理测试
  delPsyTest(params) {
    return get(baseurl + '/discover/delPsyTest', params)
  },

  // 添加新测试
  addPsyTest(params) {
    return post(baseurl + '/discover/addPsyTest', params)
  },
  // 心里测试类别管理
  // 获取心理测试类别
  getCategoryList() {
    return get(baseurl + '/discover/getCategoryList')
  },
  // 添加测试类别
  addCategory(params) {
    return get(baseurl + '/discover/addCategory', params)
  },
  // 删除测试类别
  delCategory(params) {
    return get(baseurl + '/discover/delCategory', params)
  },
  // 发现-心理咨询师管理
  // 获取咨询师列表
  getConList() {
    return get(baseurl + '/discover/getConsultantList')
  },
  // 添加咨询师
  addConsultant(params) {
    return post(baseurl + '/discover/addConsultant', params)
  },
  // 删除咨询师
  delConsultant(params) {
    return get(baseurl + '/discover/delConsultant', params)
  },
  // 发现-线上课程管理
  // 获取线上课程列表
  getCourseList() {
    return get(baseurl + '/discover/getCourseList')
  },
  // 添加线上课程
  addCourse(params) {
    return post(baseurl + '/discover/addCourse', params)
  },
  // 删除线上课程
  delCourse(params) {
    return get(baseurl + '/discover/delCourse', params)
  }

}
