/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021-04-26 12:21:50
 * @LastEditors: zqy
 * @LastEditTime: 2021-05-06 18:44:50
 */
import { createPodFromForm, createPodFromYamlFile } from '@/api/establish'
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

  // 从输入创建资源
  createPodFromForm({ commit }, podForm) {
    return new Promise((resolve, reject) => {
      createPodFromForm(podForm).then(response => {
        const { data } = response
        if (!data) {
          return reject('创建失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 从Yaml文件创建 Pod
  createPodFromYamlFile({ commit }, yamlForm) {
    console.log(yamlForm)
    return new Promise((resolve, reject) => {
      createPodFromYamlFile(yamlForm).then(response => {
        const { data } = response
        if (!data) {
          return reject('创建失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
