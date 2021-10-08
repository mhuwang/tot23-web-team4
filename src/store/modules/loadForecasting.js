/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021-09-05 7:30:55
 * @LastEditors: zqy
 * @LastEditTime: 2021-09-5 10:26:16
 */
import { autoExpandShrinkDeployment } from '@/api/loadForecasting'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken()
  }
}

const state = getDefaultState()

const mutations = {

}

const actions = {

  // 
  autoExpandShrinkDeployment({ commit }, deploymentInfo) {
    return new Promise((resolve, reject) => {
        autoExpandShrinkDeployment(deploymentInfo).then(response => {
        const { data } = response
        if (!data) {
          return reject('执行失败')
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
