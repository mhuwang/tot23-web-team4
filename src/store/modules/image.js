/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-05-16 12:37:58
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-17 15:27:49
 */
import { getAllImages, getImageById } from '@/api/images'
import { getToken } from '@/utils/auth'

const state = {
  nodeName: '',
  token: getToken(),
  // name: '',
  // avatar: ''
}

const mutations = {
  // 跳转 Edge Node 详情页面
}

const actions = {

  // 获取所有容器
  getAllImages() {
    return new Promise((resolve, reject) => {
        getAllImages().then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 通过 id 删除镜像
  delImage({ commit }, id) {
    return new Promise((resolve, reject) => {
      delImage(id).then(response => {
        const { data } = response
        if (!data) {
          return reject('删除失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 通过 id 获取容器详情
  getImageById({ commit }, id) {
    return new Promise((resolve, reject) => {
      getImageById(id).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}