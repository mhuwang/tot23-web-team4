/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:12
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-31 14:42:30
 */
import { getAllPods, getPodsByNode } from '@/api/workload/pods'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  
}

const actions = {
  // 获取所有 pods
  getAllPods({commit}, namespace) {
    return new Promise((resolve, reject) => {
        getAllPods(namespace).then(response => {
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
  // 通过 node 名称获取对应的 pod
  getPodsByNode({commit}, nodeName) {
    return new Promise((resolve, reject) => {
      getPodsByNode(nodeName).then(response => {
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

