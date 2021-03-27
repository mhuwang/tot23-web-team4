/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-25 20:41:52
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-26 16:05:53
 */
import { getAllNodes } from '@/api/cluster/nodes'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  nodeDetails: {},
  token: getToken(),
  // name: '',
  // avatar: ''
}

const mutations = {
  // 跳转 Node 详情页面
  TO_NODE_DETIALS: (state, nodeDetails) => {
    // 赋值
    state.nodeDetails = nodeDetails;
  }
}

const actions = {
  // getAllNodes
  getAllNodes({commit}) {
    return new Promise((resolve, reject) => {
        getAllNodes().then(response => {
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
  toDetails({commit, state}, nodeDetails) {
    commit("TO_NODE_DETIALS", nodeDetails);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

