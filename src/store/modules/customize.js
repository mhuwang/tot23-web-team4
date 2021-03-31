/*
 * @Description: your project
 * @version: 1.0
 * @Author: Bernie
 * @Date: 2021-03-29 17:43
 * @LastEditors: Bernie
 * @LastEditTime: 
 */
import { getCustomResourceDefinition } from '@/api/customize'
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
  // getCustomResourceDefinition
  getCustomResourceDefinition({commit}) {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

