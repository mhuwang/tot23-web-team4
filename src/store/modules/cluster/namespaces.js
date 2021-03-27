/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:23:01
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-26 16:03:55
 */
import { getAllNamespaces } from '@/api/cluster/namespaces'
import { getToken } from '@/utils/auth'

const state = {
  namespaceDetails: {},
  token: getToken(),
  // name: '',
  // avatar: ''
}

const mutations = {
  // 跳转 NameSpace 详情页面
  TO_NAMESPACE_DETIALS: (state, namespaceDetails) => {
    // 赋值
    state.namespaceDetails = namespaceDetails;
  }
}

const actions = {
  // getAllNamespaces
  getAllNamespaces({commit}) {
    return new Promise((resolve, reject) => {
        getAllNamespaces().then(response => {
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
  toDetails({commit, state}, namespaceDetails) {
    commit("TO_NAMESPACE_DETIALS", namespaceDetails);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

