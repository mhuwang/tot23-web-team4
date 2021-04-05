/*
 * @Description: your project
 * @version: 1.0
 * @Author: Bernie 
 * @Date: 2021-03-29 17:43
 * @LastEditors: Bernie
 * @LastEditTime: 
 */
import { getCustomResourceDefinition, getCustomResourceDefinitionByName } from '@/api/customize'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    customResourceDefinitionName: '',
  }
}

const state = getDefaultState()

const mutations = {
  // mutation
  // 跳转 CRD 详情页面
  TO_CRD_DETIALS: (state, customResourceDefinitionName) => {
    // 赋值
    state.customResourceDefinitionName = customResourceDefinitionName;
  }

}

const actions = {
  // getCustomResourceDefinition
  getCustomResourceDefinition({ commit }) {
    return new Promise((resolve, reject) => {
      getCustomResourceDefinition().then(response => {
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
  // getCustomResourceDefinitionByName
  getCustomResourceDefinitionByName({ commit }, customResourceDefinitionName) {
    return new Promise((resolve, reject) => {
      getCustomResourceDefinitionByName(customResourceDefinitionName).then(response => {
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
  toDetails({ commit }, customResourceDefinitionName) {
    commit("TO_CRD_DETIALS", customResourceDefinitionName);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

