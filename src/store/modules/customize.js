/*
 * @Description: your project
 * @version: 1.0
 * @Author: Bernie 
 * @Date: 2021-03-29 17:43
 * @LastEditors: Bernie
 * @LastEditTime: 2021-04-12 10:36:48
 */
import { getCustomResourceDefinition, getCustomResourceDefinitionByName, getCustomResourceDefinitionObjectListbyName, getCrdYamlByName, delCrd } from '@/api/customize'
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
  // getCrdYamlByName
  getCrdYamlByName({ commit },name) {
    return new Promise((resolve, reject) => {
      getCrdYamlByName(name).then(response => {
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
  // 给全局变量赋值
  toDetails({ commit }, customResourceDefinitionName) {
    commit("TO_CRD_DETIALS", customResourceDefinitionName);
  },
  //getCustomResourceDefinitionObjectListbyName
  getCustomResourceDefinitionObjectListbyName({ commit }, customResourceDefinitionName) {
    return new Promise((resolve, reject) => {
      getCustomResourceDefinitionObjectListbyName(customResourceDefinitionName).then(response => {
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
  
  delCrd({ commit }, name) {
    return new Promise((resolve, reject) => {
      delCrd(name).then(response => {
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

