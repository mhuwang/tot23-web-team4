/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-02 12:44:04
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-02 13:35:56
 */
import { getAllEdgeNodes, getNodeByName } from '@/api/edge'
import { getToken } from '@/utils/auth'

const state = {
  nodeName: '',
  token: getToken(),
  // name: '',
  // avatar: ''
}

const mutations = {
  // 跳转 Edge Node 详情页面
  TO_EDGE_NODE_DETIALS: (state, nodeName) => {
    // 赋值
    state.nodeName = nodeName;
  }
}

const actions = {
  // 获取所有边缘节点
  getAllEdgeNodes({ commit }) {
    return new Promise((resolve, reject) => {
      getAllEdgeNodes().then(response => {
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

  // 通过node名字获取信息 
  getNodeByName({commit}, nodeName) {
    return new Promise((resolve, reject) => {
      getNodeByName(nodeName).then(response => {
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
  toDetails({ commit }, nodeName) {
    commit("TO_EDGE_NODE_DETIALS", nodeName);
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
