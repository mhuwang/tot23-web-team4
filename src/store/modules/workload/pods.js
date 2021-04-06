/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:12
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-06 11:20:50
 */
import { getAllPods, getPodsByNode, getPodByNameAndNamespace } from '@/api/workload/pods'
import { getToken } from '@/utils/auth'


const state = {
  token: getToken(),
  pod: {
    podName: '',
    podNamespace: '',
  }
}

const mutations = {
  // 跳转 deployment 详情页面
  TO_POD_DETIALS: (state, { podName, podNamespace }) => {
    // 赋值
    state.pod.podName = podName;
    state.pod.podNamespace = podNamespace;
  }
}

const actions = {
  // 获取所有 pods
  getAllPods({ commit }, namespace) {
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
  getPodsByNode({ commit }, nodeName) {
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
  // 通过名称和命名空间获取对应的 pod的详情，带利用率信息
  getPodByNameAndNamespace({ commit }, podDetails) {
    
    return new Promise((resolve, reject) => {
      getPodByNameAndNamespace(podDetails).then(response => {
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
  // 点击名字进入详情页
  toDetails({commit}, podDetails) {
    console.log("actions", podDetails);
    commit("TO_POD_DETIALS", podDetails);
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

