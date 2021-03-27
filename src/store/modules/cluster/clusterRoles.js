/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 13:46:48
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 13:50:12
 */
import { getAllClusterRoles } from '@/api/cluster/clusterRoles'
import { getToken } from '@/utils/auth'

const state = {
  clusterRolesDetails: {},
  token: getToken(),
  // name: '',
  // avatar: ''
}

const mutations = {
  // 跳转 NameSpace 详情页面
  TO_CLUSTERROLES_DETIALS: (state, clusterRolesDetails) => {
    // 赋值
    state.clusterRolesDetails = clusterRolesDetails;
  }
}

const actions = {
  // getAllClusterRoles
  getAllClusterRoles({commit}) {
    return new Promise((resolve, reject) => {
      getAllClusterRoles().then(response => {
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
  toDetails({commit, state}, clusterRolesDetails) {
    commit("TO_CLUSTERROLES_DETIALS", clusterRolesDetails);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

